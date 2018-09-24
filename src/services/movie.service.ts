import { Injectable } from '../../node_modules/@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '99267f935d17bad167337fdaef221166';
const LANGUAGE = '?language=pt-BR';

@Injectable()
export class MovieService {

    constructor(private http: HttpClient) {
        this.http.get(URL + 'genre/movie/list' + LANGUAGE + '&api_key=' + API_KEY).subscribe(result => {
            this.genreList = result['genres'];
        });
    }

    genreList = new Array<any>();

    public findByNameOrGenre(userQuery: string, page: number): Observable<any> {
        if (this.isGenreName(userQuery)) {
            const code = this.getGenreCodeByName(userQuery);
            return this.http.get(URL + 'discover/movie' + LANGUAGE + '&with_genres=' + code + '&api_key=' + API_KEY + '&page=' + page);
        } else {
            return this.http.get(URL + 'search/movie' + LANGUAGE + '&query=' + userQuery + '&api_key=' + API_KEY + '&page=' + page);
        }
    }

    public findById(movieID: number): Observable<any> {
        return this.http.get(URL + 'movie/' + movieID + LANGUAGE + '&api_key=' + API_KEY + '&append_to_response=videos');
    }

    private isGenreName(userQuery) {
        const nameList = this.genreList.map(element => element.name.toLowerCase());
        return nameList.includes(userQuery.toLowerCase());
    }

    private getGenreCodeByName(userQuery) {
        let code = -1;
        this.genreList.forEach(element => {
            code = element.name.toLowerCase() === userQuery.toLowerCase() ? element.id : code;
        });
        return code;
    }

    public getGenreName(genreId): string {
        const genre = this.genreList.find(element => element.id === genreId);
        return genre ? genre.name : '';
    }
}
