import { Component, ViewChild } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { SearchPaginatorComponent } from '../search-paginator/search-paginator.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WhitespaceValidator } from '../../validators/WhitespaceValidator';


@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
  providers: [MovieService]
})
export class SearchMovieComponent {

  constructor(private movieService: MovieService, private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      'searchText': [null, Validators.compose([Validators.required, WhitespaceValidator])]
    });
  }

  searchForm: FormGroup;

  @ViewChild('searchPaginator')
  searchPaginator: SearchPaginatorComponent;


  public newSearch() {
    if (this.searchForm.valid) {
      this.searchPaginator.currentPage = 1;
      this.search();
    }
  }

  private search() {
    this.movieService.findByNameOrGenre(this.searchForm.get('searchText').value,
      this.searchPaginator.currentPage).subscribe(searchResponse => {
        this.formatGenreDescription(searchResponse);
        this.searchPaginator.showNewResults(searchResponse);
      });
  }

  private loadMoreResults() {
    const pageForSearch = Math.ceil(this.searchPaginator.currentPage / 4);
    this.movieService.findByNameOrGenre(this.searchForm.get('searchText').value,
      pageForSearch).subscribe(searchResponse => {
        this.formatGenreDescription(searchResponse);
        this.searchPaginator.updateResults(searchResponse);
      });
  }

  private formatGenreDescription(searchResponse) {
    searchResponse.results.forEach(element => {
      element.genre_descriptions = new Array<string>();
      element.genre_ids.forEach(genre => {
        element.genre_descriptions.push(this.movieService.getGenreName(genre));
      });
    });
  }

}
