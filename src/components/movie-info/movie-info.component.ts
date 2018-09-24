import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DomSanitizer, SafeUrl } from '../../../node_modules/@angular/platform-browser';

const POSTER_URL = 'http://image.tmdb.org/t/p/w400/';
const YOUTUBE_URL = 'https://www.youtube.com/embed/';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css'],
  providers: [MovieService]
})
export class MovieInfoComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.route.params.subscribe(result => {
      this.movieID = result.id;
    });
  }

  private movie: any;
  private movieID: number;
  private movieURL: SafeUrl;

  ngOnInit() {
    this.movieService.findById(this.movieID).subscribe(result => {
      this.movie = this.setStatusAndLanguage(result);
      this.movieURL = this.getVideo();
    });
  }

  private getURL(path) {
    return this.movie !== undefined ? POSTER_URL + this.movie.poster_path : '';
  }

  private getVideo() {
    const key = this.movie.videos !== null && this.movie.videos !== undefined && this.movie.videos.results[0] !== undefined ?
      this.movie.videos.results[0].key : undefined;
    if (key) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(YOUTUBE_URL + key);
    } else {
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
  }

  private setStatusAndLanguage(result) {
    switch (result.status) {
      case 'Post Production': result.status = 'Pós-produção'; break;
      case 'Released': result.status = 'Lançado'; break;
      case 'In Production': result.status = 'Em produção'; break;
      case 'Planned': result.status = 'Planejado'; break;
    }
    switch (result.original_language) {
      case 'en' : result.original_language = 'Inglês'; break;
      case 'fr' : result.original_language = 'Francês'; break;
      case 'pt' : result.original_language = 'Português'; break;
      case 'de' : result.original_language = 'Alemão'; break;
      case 'ja' : result.original_language = 'Japonês'; break;
      case 'ko' : result.original_language = 'Coreano'; break;
      case 'ru' : result.original_language = 'Russo'; break;
      case 'es' : result.original_language = 'Espanhol'; break;
    }
    return result;
  }

}
