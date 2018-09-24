import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SearchMovieComponent } from '../components/search-movie/search-movie.component';
import { MovieInfoComponent } from '../components/movie-info/movie-info.component';
import { ComponentModule } from '../components/component.module';
import { HttpClientModule } from '@angular/common/http';


const rotas: Routes = [{path: '', component: SearchMovieComponent},
                  {path: 'info/:id', component: MovieInfoComponent, }];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentModule,
    HttpClientModule,
    RouterModule.forRoot(rotas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
