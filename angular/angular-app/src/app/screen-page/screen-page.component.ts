import { Component, OnInit } from '@angular/core';
import { Observable, from  } from 'rxjs';

import { ApiService, SERVER_URL } from '../api.service';
import { Screen } from '../screen';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

const CATEGORY_HEIGHT= 100;
const PRODUCT_HEIGHT = 80;

@Component({
  selector: 'app-screen-page',
  templateUrl: './screen-page.component.html',
  styleUrls: ['./screen-page.component.css']
})
export class ScreenPageComponent implements OnInit {
  screen$!: any;
  cast_id!: number;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cast_id = this.route.snapshot.params['id'];
    this.getScreens(this.cast_id);
  }

  public getScreens(cast_id: number) {
    this.apiService.getScreens().subscribe((res: any) => {
      // const categories = res.categories.map();
      let screens = res.screens || [];
      let categories = res.categories || [];
      let products = res.products || [];
      let productScreens: any = []!;
      let wholeList: any = [];

      // set orientation, media
      screens = screens.map((screen: any) => {
        return {
          ...screen,
          media: screen.media,
          width: screen.orientation == 'portrait'? screen.height: screen.width,
          height: screen.orientation == 'portrait'? screen.width: screen.height,
        }
      })

      categories.forEach((category: any) => {
        // get products for given category
        let cProudcts = products.map((item: any) => ({...item, height: PRODUCT_HEIGHT})).filter((product: any) => product.categoryId == category.category_id);
        
        // set grams on category
        let smallGrams = '.5g';
        let largeGrams = '1g';
        if(cProudcts.length > 0) {
          smallGrams = cProudcts[0].productGrams > 1? '1g': '.5g';
          largeGrams = cProudcts[0].productGrams > 1? '1/8oz': '1g';
        }

        // add category to whole list
        wholeList.push({
          ...category, 
          height: CATEGORY_HEIGHT, 
          smallGrams: smallGrams, 
          largeGrams: largeGrams
        });

        // set small price
        cProudcts = cProudcts.map((product: any) => ({
          ...product,
          smallPrice: smallGrams == '1g'? product.price/2: product.price/3.5
        }));

        if(category.arrangeable) {
          cProudcts = cProudcts.sort((a: any, b: any) => a.category_name > b.category_name)
        }
        wholeList = wholeList.concat(cProudcts);
      })

      screens.forEach((screen: Screen) => {
        if(screen.type == 'menu') {
          let list: any = [];
          let height = 0;
          for(const item of wholeList) {
            if(item.category_id && item.start_on_new) {
              break;
            }
            else {
              height += item.category_id? CATEGORY_HEIGHT: PRODUCT_HEIGHT;
              if(height <= screen.height - 40) {
                list.push(item);
              }
            }
          }
          wholeList = wholeList.slice(list.length)
          productScreens.push({
            ...screen,
            list: from(Array(list)) as Observable<Screen[]>
          });
        }
        else productScreens.push(screen);
      })

      this.screen$ = productScreens.find((item: any) => item.cast_id == this.cast_id);
      console.log(this.screen$)
    });
  }
}
