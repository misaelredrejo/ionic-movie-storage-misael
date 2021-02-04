import { Component, OnInit } from '@angular/core';
import { IMovie } from '../shared/interfaces';
import { MoviedbService } from '../core/moviedbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public movies: IMovie[];
  moviesinit: IMovie[] = [
    {
      id: '1',
      name: 'EL padrino',
      genre: 'Grangsteres, Drama',
      date: '1972',
      cover:
        'http://es.web.img3.acsta.net/pictures/18/06/12/12/12/0117051.jpg?coixp=49&coiyp=27',
      description: "El Padrino (título original en inglés: The Godfather1) es una película estadounidense de 1972 dirigida por Francis FordCoppola.El filme fue producido por Albert S.Ruddy, de la compañíaParamount Pictures.Está basada en la novela homónima(que a su vez estábasada en la familia real de los Mortillaro de Sicilia), de Mario Puzo,quien adaptó el guion junto a Coppola y Robert Towne, este último sin seracreditado"
    },
    {
      id: '2',
      name: 'Kill Bill',
      genre: 'acción, película de violación y venganza y artesmarciales',
      date: '2003',
      cover:
        'https://images-na.ssl-images-amazon.com/images/I/51crSdRxLNL._SY445_.jpg',
      description: "Kill Bill es una película de acción y suspensoestadounidense de dos partes estrenada en 2003 y 2004 respectivamente,que fue escrita y dirigida por Quentin Tarantino.Kill Bill originalmentefue propuesta para tener un lanzamiento único en los cines, pero con unaduración de más de cuatro horas, fue separada en dos volúmenes: KillBill: Volumen 1, lanzada a finales de 2003, y Kill Bill: Volumen 2,lanzada a inicios de 2004. Las dos películas fueron bien recibidas por lacrítica, muchos notando su estilo de dirección y su homenaje a géneroscinematográficos como las películas de artes marciales hongkonesa, laspelículas de samuráis, spaghetti western, chicas con armas y venganza."
    }
  ]
  constructor(private moviedbService: MoviedbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.movies !== undefined) {
      this.movies.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.moviedbService.empty()) {
      this.moviesinit.forEach(movie => {
        this.moviedbService.setItem(movie.id, movie);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.moviedbService.getAll().then(
      (data) => this.movies = data
    );
  }
  movieTapped(movie) {
    this.route.navigate(['details', movie.id]);
  }
}