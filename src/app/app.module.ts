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
import { OrphanedBlocksComponent } from './orphaned-blocks/orphaned-blocks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { DialogsService } from './dialogs.service';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: 'databases/:databaseId/blocks', component: BlockPageComponent },
  { path: 'databases/:databaseId/block', component: SingleBlockComponent },
  { path: 'databases/:databaseId/test', component: OrphanedBlocksComponent },
  { path: '**', component: AboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BlockPageComponent,
    FiltersComponent,
    AboutComponent,
    BlockComponent,
    SingleBlockComponent,
    OrphanedBlocksComponent,
    LoginDialogComponent
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
    MatDialogModule,
    MatInputModule,
    FlexLayoutModule
  ],
  entryComponents: [LoginDialogComponent],
  providers: [CouchdbService, FilterService, DialogsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
