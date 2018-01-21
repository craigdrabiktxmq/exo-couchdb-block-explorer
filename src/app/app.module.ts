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
import { FiltersComponent } from './filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockPageComponent,
    FiltersComponent
  ],
  imports: [
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
  providers: [CouchdbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
