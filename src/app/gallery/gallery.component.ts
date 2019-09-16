import { Component, OnInit } from '@angular/core';
import { PhotosService } from "../photos.service"
import { CategoriesService } from "../categories.service"
import { merge } from "ramda"
import { Observable } from 'rxjs';
import { map } from "rxjs/operators"

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
    photosList$: Observable<{}[]>;
    categories: {}[];

    constructor(
        private photosService: PhotosService,
        private categoriesService: CategoriesService,
    ) {
    }

    ngOnInit() {
        this.photosList$ = this.categoriesService.getActiveCategory().pipe(
            map(activeCategoryID =>
                this.photosService.getPhotosList().map(
                    photo => merge(photo, {
                        category: this.categoriesService.getByID(photo.categoryID)
                    })
                ).filter(
                    photo => photo.categoryID === activeCategoryID
                ))
        )

    }
}
