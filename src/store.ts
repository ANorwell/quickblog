import moment, { Moment } from 'moment';
import config from './config';

interface ContentSummary {
    path: string;
    title: string;
    tags: string;
    date: Moment;
}

class ContentData {
    constructor(public summary: ContentSummary, public content: string) {}
}

class Store {
    public data = {
        loadedContents: [] as ContentData[],
        contentSummaries: [] as ContentSummary[],
        store: this
    };

    private manifest: ContentSummary[]|null = null;

    constructor(private contentType: string, private readonly contentsPerPage: number) {}

    public hasMoreFetchableContent(): boolean {
        return (this.data.loadedContents.length > 0) &&
            (this.data.loadedContents.length < this.data.contentSummaries.length);
    }

    public setContentType(newContentType: string) {
        if (newContentType !== this.contentType) {
            this.data.loadedContents = [];
            this.data.contentSummaries = [];
            this.manifest = null;
            this.contentType = newContentType;
        }
    }

    public async filterContentsByTag(tag: string | null = null) {
        await this.filterContents((content: ContentSummary) => {
            if (tag === null) {
                return !content.tags.includes('draft');
            } else {
                return content.tags.includes(tag);
            }
        });
    }

    public async filterContentsByTitle(title: string) {
        await this.filterContents((content: ContentSummary) => content.title === title);
    }

    public async fetchMore() {
        const lastContentIndex = this.data.loadedContents.length;
        const nextPage = this.data.contentSummaries.slice(lastContentIndex, lastContentIndex + this.contentsPerPage);
        const loaded = await Promise.all(nextPage.map(async (p) => this.fetchContentData(p)));
        this.data.loadedContents = this.data.loadedContents.concat(loaded);
    }

    private async fetchIndex(): Promise<ContentSummary[]> {
        if (this.manifest === null) {
            const out: ContentSummary[] = await (await fetch(this.contentsPath())).json();
            this.manifest = out;
        }
        this.manifest.forEach((p) => p.date = moment(p.date));
        return this.manifest as ContentSummary[];
    }

    private contentsPath(): string {
        return config.contentPath + '/' + this.contentType + '.json';
    }

    private async filterContents(filter: (p: ContentSummary) => boolean) {
        this.data.contentSummaries = (await this.fetchIndex()).filter((content) => filter(content));
        this.data.loadedContents = [];
    }

    private async fetchContentData(summary: ContentSummary): Promise<ContentData> {
        const data = await (await fetch(summary.path)).text();
        return new ContentData(summary, data);
    }
}

export default Store;
