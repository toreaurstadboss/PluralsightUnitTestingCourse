import { TestBed, ComponentFixture } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { Spied } from "../Spied";
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService: Spied<HeroService>, mockLocation;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3'}}
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [ FormsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute},
        { provide: HeroService, useValue: mockHeroService},
        { provide: Location, useValue: mockLocation}
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render hero name in a  h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

});
