import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Bookmark } from 'src/app/store/models/bookmarks';
import { MatMenuHarness } from '@angular/material/menu/testing';
import { ​TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { FolderComponent } from './folder.component';
import { HarnessLoader } from '@angular/cdk/testing';

describe('FolderComponent', () => {
  let component: FolderComponent;
  let fixture: ComponentFixture<FolderComponent>;
  let loader: HarnessLoader;
  const bookmarkMock: Bookmark = {
    id: 1,
    name: 'testBookmark',
    url: 'testLink',
    group: 'testGroup'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FolderComponent ],
      imports: [
        NoopAnimationsModule,
        MatMenuModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderComponent);
    component = fixture.componentInstance;
    component.list = [bookmarkMock];
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('bookmark menu', () => {
    it('should open and close menu', async () => {
      const bookmarkMenu = await loader.getHarness<MatMenuHarness>(MatMenuHarness.with({
        selector: '#bookmarkMenu',
      }));
      expect(await bookmarkMenu.isOpen()).toBe(false);
      await bookmarkMenu.open();
      expect(await bookmarkMenu.isOpen()).toBe(true);
      await bookmarkMenu.close();
      expect(await bookmarkMenu.isOpen()).toBe(false);
    });

    it('should load all menu harnesses', async () => {
      const bookmarkMenu = await loader.getHarness<MatMenuHarness>(MatMenuHarness.with({
        selector: '#bookmarkMenu',
      }));
      await bookmarkMenu.open();
      const menuItems = await bookmarkMenu.getItems();
      expect(menuItems.length).toBe(1);
    });

    it('should call redirectHandler on menu-item click', async () => {
      spyOn(component, 'redirectHandler');
      const bookmarkMenu = await loader.getHarness<MatMenuHarness>(MatMenuHarness.with({
        selector: '#bookmarkMenu',
      }));
      await bookmarkMenu.open();
      const link = fixture.nativeElement.parentNode.querySelector('.redirect-btn');
      const event = new Event('click');
      link.dispatchEvent(event);
      expect(component.redirectHandler).toHaveBeenCalledWith(event, bookmarkMock);
    });

    it('should emit bookmarkRedirectHandler on menu-item click', async () => {
      const event = new Event('click');
      spyOn(component.bookmarkRedirectHandler, 'emit');
      spyOn(event, 'preventDefault');
      component.redirectHandler(event, bookmarkMock);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(component.bookmarkRedirectHandler.emit).toHaveBeenCalledWith(bookmarkMock);
    });
  });
});
