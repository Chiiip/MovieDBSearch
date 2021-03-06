import { NgModule } from '@angular/core';

import { SearchMovieComponent } from './search-movie/search-movie.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { SearchPaginatorComponent } from './search-paginator/search-paginator.component';
import { CommonModule } from '../../node_modules/@angular/common';
import { HoursMinutesPipe } from '../pipes/HoursMinutes.pipe';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
      SearchMovieComponent,
      MovieInfoComponent,
      SearchPaginatorComponent,
      HoursMinutesPipe
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [HeaderComponent,
        SearchMovieComponent,
        MovieInfoComponent,
        SearchPaginatorComponent,
        HoursMinutesPipe,
        FooterComponent
    ],
    providers: []
  })
  export class ComponentModule { }
