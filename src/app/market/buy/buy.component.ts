import { Component, OnInit } from '@angular/core';

import { ListingService } from 'app/core/market/api/listing/listing.service';
import { FavoritesService } from 'app/core/market/api/favorites/favorites.service';
import { Listing } from 'app/core/market/api/listing/listing.model';
import { Cart } from 'app/core/market/api/cart/cart.model';
import { CountryListService } from 'app/core/market/api/countrylist/countrylist.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  public selectedTab: number = 0;
  public tabLabels: Array<string> = ['cart', 'orders', 'favourites'];

  public filters: any = {
    search: undefined,
    sort:   undefined,
    status: undefined
  };

  public profile: any = { };

  /* cart */
  public cart: Cart;

  /* favs */
  public favorites: Array<Listing> = [];

  constructor(
    private listingService: ListingService,
    private favoritesService: FavoritesService,
    public countryList: CountryListService
  ) { }

  ngOnInit() {
    this.favoritesService.updateListOfFavorites();
    this.getFavorites();
  }

  getFavorites() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      const temp: Array<Listing> = new Array<Listing>();
      favorites.forEach(favorite => {
        this.listingService.get(favorite.listingItemId).take(1).subscribe(listing => {
          temp.push(listing);
          // little cheat here, because async behavior
          // we're setting the pointer to our new temp array every time we receive
          // a listing.
          this.favorites = temp;
        });
      });
    });
  }

  clear(): void {
    this.filters();
  }

  changeTab(index: number): void {
    this.selectedTab = index;
  }

}


