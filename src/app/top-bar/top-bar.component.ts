import { Component, OnInit } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

import { LocalizationService } from '../localization.service';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  items: MenuItem[];

  constructor(private localizationService: LocalizationService) {
  }

  ngOnInit() {
    this.localizationService.getLocalization().subscribe(() => {
      this.items = [
        { label: this.localizationService.get('menu.account'), routerLink: ['/'] },
        { label: this.localizationService.get('menu.missions'), routerLink: ['/missions'] }
      ];
    });
  }
}
