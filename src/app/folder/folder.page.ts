import { GmapsService } from './../services/gmaps.service';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {

// this gets the map element from the DOM
@ViewChild('map', { static: true })
mapElementRef!: ElementRef;
// this is the google maps object
googleMaps: any;
// this is the center of the map
center = { lat: 35.1850678, lng: -84.8877585 };
// this is the map object
map: any;
// this is the map click listener
mapClickListener: any;
// this is the marker click listener
markerClickListener: any;
// this is the array of markers
markers: any[] = [];


constructor(
  private gmaps: GmapsService,
  private renderer: Renderer2,
  private actionSheetCtrl: ActionSheetController
) {}

ngOnInit(): void {
}

// this is the function that gets called when the map is ready
ngAfterViewInit() {
  this.loadMap();
}

// this is the function that loads the map
async loadMap() {
  try {
    let googleMaps: any = await this.gmaps.loadingGoogleMaps();
    this.googleMaps = googleMaps;
    const mapEl = this.mapElementRef.nativeElement;
    const location = new googleMaps.LatLng(this.center.lat, this.center.lng);
    this.map = new googleMaps.Map(mapEl, {
      center: location,
      zoom: 12,
    });
    this.renderer.addClass(mapEl, 'visible');
    this.addMarker(location);
    this.onMapClick();
  } catch(e) {
    console.log(e);
  }
}

onMapClick() {
  this.mapClickListener = this.googleMaps.event.addListener(this.map, "click", (mapsMouseEvent: { latLng: { toJSON: () => any; }; }) => {
    console.log(mapsMouseEvent.latLng.toJSON());
    this.addMarker(mapsMouseEvent.latLng);
  });
}
// this is the function that adds a marker to the map
addMarker(location: any) {
  let googleMaps: any = this.googleMaps;
  const icon = {
    url: 'assets/icons/location-pin.png',
    scaledSize: new googleMaps.Size(50, 50), 
  };
  const marker = new googleMaps.Marker({
    position: location,
    map: this.map,
    icon: icon,
    // draggable: true,
    animation: googleMaps.Animation.DROP
  });
  this.markers.push(marker);
  // this.presentActionSheet();
  this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
    console.log('markerclick', marker);
    this.checkAndRemoveMarker(marker);
    console.log('markers: ', this.markers);
  });
}
// this is the function that removes a marker from the map
checkAndRemoveMarker(marker: { position: { lat: () => any; lng: () => any; }; }) {
  const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
  console.log('is marker already: ', index);
  if(index >= 0) {
    this.markers[index].setMap(null);
    this.markers.splice(index, 1);
    return;
  }
}
// this is the function that presents the action sheet
async presentActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Added Marker',
    subHeader: '',
    buttons: [
      {
        text: 'Remove',
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },
      {
        text: 'Save',
        data: {
          action: 'share',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  });

  await actionSheet.present();
}

// this is the function that gets called when the page is destroyed
ngOnDestroy() {
  this.googleMaps.event.removeAllListeners();
  if(this.mapClickListener) this.googleMaps.event.removeListener(this.mapClickListener);
  if(this.markerClickListener) this.googleMaps.event.removeListener(this.markerClickListener);
}
}