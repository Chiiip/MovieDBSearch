import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';

const PAGE_SIZE = 5;
const POSTER_URL = 'http://image.tmdb.org/t/p/w200/';

@Component({
    selector: 'app-search-paginator',
    templateUrl: './search-paginator.component.html',
    styleUrls: ['./search-paginator.component.css']
})
export class SearchPaginatorComponent {

    totalPages = new Array<number>();
    currentPages = new Array<number>();
    searchResult = new Array<any>();
    cachedPages = new Array<number>();
    currentPage = 1;

    @Output()
    moreResultsEvent = new EventEmitter();

    constructor(private router: Router) {}

    public showNewResults(searchResponse) {
        const numberPages = Math.ceil(searchResponse.total_results / PAGE_SIZE);
        this.searchResult = searchResponse.results;
        this.totalPages = Array(numberPages).fill(1).map((x, i) => i + 1);
        this.selectPage(this.currentPage);
    }

    public updateResults(searchResponse) {
        this.searchResult = searchResponse.results;
    }

    private buildPages() {
        let start;
        let end;
        if (this.currentPage <= 3 || this.totalPages.length <= PAGE_SIZE) {
            start = 0;
            end = 5;
        } else if (this.currentPage + 2 >= this.totalPages.length) {
            start = this.totalPages.length - PAGE_SIZE;
            end = this.totalPages.length;
        } else {
            start = this.currentPage - 3;
            end = this.currentPage + 2;
        }
        this.currentPages = this.totalPages.slice(start, end);
        this.setCachedPages();
    }

    private selectPage(page) {
        const previousPage = this.currentPage;
        this.currentPage = page;
        if (previousPage !== page && !this.cachedPages.includes(page)) {
            this.moreResultsEvent.emit();
        }
        this.buildPages();
    }

    private setCachedPages() {
        const begin = Math.floor((this.currentPage - 1) / 4) * 4 + 1;
        const end = begin + 3;
        this.cachedPages = Array(end - begin + 1).fill(1).map((_, i) => begin + i);
    }

    private getURL(path) {
        return POSTER_URL + path;
    }

    private viewDetail(id) {
        this.router.navigate(['/info', id]);
    }
}
