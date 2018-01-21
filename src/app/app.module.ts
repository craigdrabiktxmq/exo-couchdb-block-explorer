import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { CouchdbService } from './couchdb.service';
import { BlockPageComponent } from './block-page/block-page.component';
import { AboutComponent } from './about/about.component';
import { FiltersComponent } from './filters/filters.component';
import { RouterModule, Routes } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { SingleBlockComponent } from './single-block/single-block.component';
import { FilterService } from './filter.service';

const routes: Routes = [
  { path: 'databases/:databaseId/blocks', component: BlockPageComponent },
  { path: 'databases/:databaseId/block', component: SingleBlockComponent },
  { path: '**', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlockPageComponent,
    FiltersComponent,
    AboutComponent,
    BlockComponent,
    SingleBlockComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [CouchdbService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
