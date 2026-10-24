import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { map } from 'rxjs';
import { Footer } from '../../layout/footer/footer';


/* =========================================================
   GAME MODEL
   ========================================================= */

interface CasinoImg {
  id: number;
  category: string;
  image: string;
}

interface CasinoGame {
  id: string;
  name: string;
  image: string;
  category: string;
  provider: string;
  providerSlug: string;
}


/* =========================================================
   BANNER MODEL
   ========================================================= */

interface CasinoBanner {
  id: string;
  name: string;
  subtitle: string;
  button: string;
  image: string;
  theme: 'red' | 'green';
  type: 'Instant' | 'Live';
  icon: string;
  slug: string;
}


/* =========================================================
   CATEGORY MODEL
   ========================================================= */

interface CasinoCategory {
  name: string;
  slug: string;
  icon: string;
  image?: string;
}


/* =========================================================
   COMPONENT
   ========================================================= */

@Component({
  selector: 'app-casino-page',

  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive,
    Footer
  ],
  templateUrl: './casino.html',
  styleUrl: './casino.scss',
})
export class CasinoPage {

  private readonly route = inject(ActivatedRoute);

  protected readonly activeBannerIndex = signal(0);
  protected providersExpanded = false;

  protected toggleProviders(): void {
    this.providersExpanded = !this.providersExpanded;
  }


  /* =======================================================
     CURRENT CATEGORY
     ======================================================= */

  protected readonly selectedCategory = toSignal(
    this.route.paramMap.pipe(
      map(
        (params) =>
          params.get('category') ?? 'lobby',
      ),
    ),
    {
      initialValue:
        this.route.snapshot.paramMap.get(
          'category',
        ) ?? 'lobby',
    },
  );


  /* =======================================================
     PROVIDERS
     ======================================================= */

  protected readonly providers = [
    {
      name: 'Evolution',
      count: 66,
      slug: 'evolution',
      img: '../../../assets/icons/1.webp',
      color: 'gold',
    },

    {
      name: 'Turbogames',
      count: 35,
      slug: 'turbogames',
      img: '../../../assets/icons/2.webp',
      color: 'red',
    },

    {
      name: 'Mac88 Gaming',
      count: 29,
      slug: 'mac88',
      img: '../../../assets/icons/3.webp',
      color: 'blue',
    },

    {
      name: 'TopSpin Games',
      count: 26,
      slug: 'topspin',
      img: '../../../assets/icons/4.webp',
      color: 'white',
    },

    {
      name: 'Ezugi',
      count: 25,
      slug: 'ezugi',
      img: '../../../assets/icons/5.webp',
      color: 'white',
    },
  ];

  protected readonly categories: CasinoCategory[] = [
    {
      name: 'Lobby',
      slug: 'lobby',
      icon: '♠',
      image: 'assets/casino/1.webp',
    },

    {
      name: 'Evolution',
      slug: 'evolution',
      icon: '◒',
      image: 'assets/casino/2.webp',
    },

    {
      name: 'Indian Games',
      slug: 'indian-games',
      icon: '🂡',
      image: 'assets/casino/3.webp',
    },

    {
      name: 'Teen Patti',
      slug: 'teen-patti',
      icon: '🃏',
      image: 'assets/casino/5.webp',
    },

    {
      name: 'Roulette',
      slug: 'roulette',
      icon: '🎡',
      image: 'assets/casino/6.webp',
    },

    {
      name: 'Baccarat',
      slug: 'baccarat',
      icon: '♦',
      image: 'assets/casino/8.webp',
    },

    {
      name: 'Instant Games',
      slug: 'instant-games',
      icon: '🚀',
      image: 'assets/casino/10.webp',
    },

    {
      name: 'Game Shows',
      slug: 'game-shows',
      icon: '👑',
      image: 'assets/casino/11.webp',
    },

    {
      name: 'Dragon Tiger',
      slug: 'dragon-tiger',
      icon: '🐉',
      image: 'assets/casino/12.webp',
    },

    {
      name: 'Blackjack',
      slug: 'blackjack',
      icon: '🂡',
      image: 'assets/casino/13.webp',
    },

    {
      name: 'Blackjack-dealer',
      slug: 'blackjack-dealer',
      icon: '🂡',
      image: 'assets/casino/14.webp',
    },

  ];


  protected readonly banners: CasinoBanner[] = [

    {
      id: 'aviator',

      name: 'Aviator',

      subtitle:
        'Fast, Fun & Full of thrill!',

      button:
        'Take Flight',

      image:
        'assets/1.webp',

      theme:
        'red',

      type:
        'Instant',

      icon:
        '✈',

      slug:
        'instant-games',
    },


    {
      id: 'roulette',

      name: 'Roulette',

      subtitle:
        'Every spin is a new chance!',

      button:
        'Spin & Win',

      image:
        'assets/2.webp',

      theme:
        'green',

      type:
        'Live',

      icon:
        '◉',

      slug:
        'roulette',
    },

    {
      id: 'lightning-storm',

      name: 'Lightning Storm',

      subtitle:
        'Feel the thrill of every spin!',

      button:
        'Play Now',

      image:
        'assets/3.webp',

      theme:
        'green',

      type:
        'Live',

      icon:
        '⚡',

      slug:
        'game-shows',
    },

    {
      id: 'funky-time',

      name: 'Funky Time',

      subtitle:
        'Your live game show starts here!',

      button:
        'Join the Fun',

      image:
        'assets/4.webp',

      theme:
        'red',

      type:
        'Live',

      icon:
        '✦',

      slug:
        'game-shows',
    },

  ];

  protected get bannerPages(): CasinoBanner[][] {
    return Array.from(
      { length: Math.ceil(this.banners.length / 2) },
      (_, index) => this.banners.slice(index * 2, index * 2 + 2),
    );
  }

  protected isActiveBannerPage(pageIndex: number): boolean {
    return Math.floor(this.activeBannerIndex() / 2) === pageIndex;
  }

  protected showPreviousBannerPage(): void {
    this.activeBannerIndex.update(
      (index) => (Math.floor(index / 2) * 2 - 2 + this.banners.length) % this.banners.length,
    );
  }

  protected showNextBannerPage(): void {
    this.activeBannerIndex.update(
      (index) => (Math.floor(index / 2) * 2 + 2) % this.banners.length,
    );
  }

  protected readonly games: CasinoGame[] = [
  {
    id: '12-coins',
    name: '12\u00A0Coins',
    image: 'assets/casino-games/1.webp',
    category: 'instant-games',
    provider: 'Betsoft',
    providerSlug: 'betsoft',
  },
  {
    id: 'dragon-tiger',
    name: 'Dragon\u00A0Tiger',
    image: 'assets/casino-games/2.webp',
    category: 'dragon-tiger',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'teen-patti-20-20',
    name: 'Teen\u00A0Patti\u00A020-20',
    image: 'assets/casino-games/3.webp',
    category: 'teen-patti',
    provider: 'Mac88 Gaming',
    providerSlug: 'mac88',
  },
  {
    id: 'aviator',
    name: 'Aviator',
    image: 'assets/casino-games/4.webp',
    category: 'instant-games',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'speed-blackjack',
    name: 'Speed\u00A0Blackjack',
    image: 'assets/casino-games/5.webp',
    category: 'blackjack',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'baccarat',
    name: 'Baccarat',
    image: 'assets/casino-games/6.webp',
    category: 'baccarat',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'roulette-live',
    name: 'Roulette\u00A0Live',
    image: 'assets/casino-games/8.webp',
    category: 'roulette',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: '32-cards',
    name: '32\u00A0Cards',
    image: 'assets/casino-games/10.webp',
    category: 'indian-games',
    provider: 'Mac88 Gaming',
    providerSlug: 'mac88',
  },
  {
    id: 'red-door-roulette',
    name: 'Red\u00A0Door\u00A0Roulette',
    image: 'assets/casino-games/11.webp',
    category: 'roulette',
    provider: 'Ezugi',
    providerSlug: 'ezugi',
  },
  {
    id: 'auto-roulette',
    name: 'Auto\u00A0Roulette',
    image: 'assets/casino-games/12.webp',
    category: 'roulette',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'lightning-roulette',
    name: 'Lightning\u00A0Roulette',
    image: 'assets/casino-games/13.webp',
    category: 'roulette',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'lightning-storm',
    name: 'Lightning\u00A0Storm',
    image: 'assets/casino-games/14.webp',
    category: 'game-shows',
    provider: 'Ezugi',
    providerSlug: 'ezugi',
  },
  {
    id: 'funky-time',
    name: 'Funky\u00A0Time',
    image: 'assets/casino-games/15.webp',
    category: 'game-shows',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'mines',
    name: 'Mines',
    image: 'assets/casino-games/16.webp',
    category: 'instant-games',
    provider: 'Turbogames',
    providerSlug: 'turbogames',
  },
  {
    id: 'crazy-ball',
    name: 'Crazy\u00A0Ball',
    image: 'assets/casino-games/18.webp',
    category: 'game-shows',
    provider: 'Ezugi',
    providerSlug: 'ezugi',
  },
  {
    id: 'monopoly-big-baller',
    name: 'Monopoly\u00A0Big\u00A0Baller',
    image: 'assets/casino-games/20.webp',
    category: 'game-shows',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'good-girl-bad-girl',
    name: 'Good Girl Bad Girl',
    image: 'assets/casino-games/17.webp',
    category: 'slots',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'coin-strike',
    name: 'Coin Strike',
    image: 'assets/casino-games/21.webp',
    category: 'slots',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'stacked',
    name: 'Stacked',
    image: 'assets/casino-games/22.webp',
    category: 'slots',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'take-the-bank',
    name: 'Take the Bank',
    image: 'assets/casino-games/30.webp',
    category: 'slots',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'grand-christmas-heist',
    name: 'Grand Christmas Heist',
    image: 'assets/casino-games/34.jpg',
    category: 'slots',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'lightning-dice',
    name: 'Lightning Dice',
    image: 'assets/casino-games/24.webp',
    category: 'sicbo',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'plinko-x',
    name: 'Plinko X',
    image: 'assets/casino-games/23.webp',
    category: 'lottery',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'casino-holdem',
    name: 'Casino Hold’em',
    image: 'assets/casino-games/26.webp',
    category: 'poker',
    provider: 'Evolution',
    providerSlug: 'evolution',
  },
  {
    id: 'super-over',
    name: 'Super Over',
    image: 'assets/casino-games/27.webp',
    category: 'virtuals',
    provider: 'Mac88 Gaming',
    providerSlug: 'mac88',
  },
  {
    id: 'virtual-sports',
    name: 'Virtual Sports',
    image: 'assets/casino-games/36.webp',
    category: 'sport',
    provider: 'Mac88 Gaming',
    providerSlug: 'mac88',
  },
];

  protected get visibleGames(): CasinoGame[] {
    const category = this.selectedCategory();

    // Default Lobby / New Releases page
    if (
      !category ||
      category === 'lobby' ||
      category === 'new-releases'
    ) {
      // 9 games + 1 More Releases card = 10 cards
      return this.games.slice(0, 9);
    }

    // Category or provider page
    return this.games.filter(
      (game) =>
        game.category === category ||
        game.providerSlug === category
    );
  }

  protected get showMoreReleasesCard(): boolean {
    const category = this.selectedCategory();

    return (
      !category ||
      category === 'lobby' ||
      category === 'new-releases'
    );
  }

  protected readonly newReleases: CasinoImg[] = [
    {
      id: 1,
      image: 'assets/casino-img/new-release1.jpg',
      category: 'new-release'
    },
    {
      id: 2,
      image: 'assets/casino-img/new-release2.jpg',
      category: 'new-release'
    },
    {
      id: 3,
      image: 'assets/casino-img/new-release3.jpg',
      category: 'new-release'
    },
    {
      id: 4,
      image: 'assets/casino-img/new-release4.jpg',
      category: 'new-release'
    },
    {
      id: 5,
      image: 'assets/casino-img/new-release5.jpg',
      category: 'new-release'
    },
    {
      id: 6,
      image: 'assets/casino-img/new-release6.jpg',
      category: 'new-release'
    },
    {
      id: 7,
      image: 'assets/casino-img/new-release7.jpg',
      category: 'new-release'
    },
    {
      id: 8,
      image: 'assets/casino-img/new-release8.jpg',
      category: 'new-release'
    },
    {
      id: 9,
      image: 'assets/casino-img/new-release9.jpg',
      category: 'new-release'
    },
    {
      id: 10,
      image: 'assets/casino-img/trending1.jpg',
      category: 'trending'
    },
    {
      id: 11,
      image: 'assets/casino-img/trending2.jpg',
      category: 'trending'
    },
    {
      id: 12,
      image: 'assets/casino-img/trending3.webp',
      category: 'trending'
    },
    {
      id: 13,
      image: 'assets/casino-img/trending4.webp',
      category: 'trending'
    },
    {
      id: 14,
      image: 'assets/casino-img/trending5.webp',
      category: 'trending'
    },
    {
      id: 15,
      image: 'assets/casino-img/trending6.webp',
      category: 'trending'
    },
    {
      id: 16,
      image: 'assets/casino-img/trending7.webp',
      category: 'trending'
    },
    {
      id: 17,
      image: 'assets/casino-img/trending8.webp',
      category: 'trending'
    },
    {
      id: 18,
      image: 'assets/casino-img/trending9.webp',
      category: 'trending'
    },

    {
      id: 19,
      image: 'assets/casino-img/editor1.jpg',
      category: 'editor'
    },
    {
      id: 20,
      image: 'assets/casino-img/editor2.webp',
      category: 'editor'
    },
    {
      id: 21,
      image: 'assets/casino-img/editor3.webp',
      category: 'editor'
    },
    {
      id: 22,
      image: 'assets/casino-img/editor4.webp',
      category: 'editor'
    },
    {
      id: 23,
      image: 'assets/casino-img/editor5.webp',
      category: 'editor'
    },
    {
      id: 24,
      image: 'assets/casino-img/editor6.webp',
      category: 'editor'
    },
    {
      id: 25,
      image: 'assets/casino-img/editor7.webp',
      category: 'editor'
    },
    {
      id: 26,
      image: 'assets/casino-img/editor8.webp',
      category: 'editor'
    },
    {
      id: 27,
      image: 'assets/casino-img/editor9.webp',
      category: 'editor'
    },
    {
      id: 28,
      image: 'assets/casino-img/evolution1.webp',
      category: 'evolution'
    },
    {
      id: 29,
      image: 'assets/casino-img/evolution2.webp',
      category: 'evolution'
    },
    {
      id: 30,
      image: 'assets/casino-img/evolution3.webp',
      category: 'evolution'
    },
    {
      id: 31,
      image: 'assets/casino-img/evolution4.webp',
      category: 'evolution'
    },
    {
      id: 32,
      image: 'assets/casino-img/evolution5.webp',
      category: 'evolution'
    },
    {
      id: 33,
      image: 'assets/casino-img/evolution6.webp',
      category: 'evolution'
    },
    {
      id: 34,
      image: 'assets/casino-img/evolution7.webp',
      category: 'evolution'
    },
    {
      id: 35,
      image: 'assets/casino-img/evolution8.jpg',
      category: 'evolution'
    },
    {
      id: 36,
      image: 'assets/casino-img/evolution9.webp',
      category: 'evolution'
    },
    // indian
    {
      id: 37,
      image: 'assets/casino-img/indian1.webp',
      category: 'indian'
    },
    {
      id: 38,
      image: 'assets/casino-img/indian2.webp',
      category: 'indian'
    },
    {
      id: 39,
      image: 'assets/casino-img/indian3.webp',
      category: 'indian'
    },
    {
      id: 40,
      image: 'assets/casino-img/indian4.webp',
      category: 'indian'
    },
    {
      id: 41,
      image: 'assets/casino-img/indian5.webp',
      category: 'indian'
    },
    {
      id: 42,
      image: 'assets/casino-img/indian6.webp',
      category: 'indian'
    },
    {
      id: 43,
      image: 'assets/casino-img/indian7.png',
      category: 'indian'
    },
    {
      id: 44,
      image: 'assets/casino-img/indian8.webp',
      category: 'indian'
    },
    {
      id: 45,
      image: 'assets/casino-img/indian9.jpg',
      category: 'indian'
    },
    {
      id: 46,
      image: 'assets/casino-img/teen1.webp',
      category: 'teen'
    },
    {
      id: 47,
      image: 'assets/casino-img/teen2.jpg',
      category: 'teen'
    },
    {
      id: 48,
      image: 'assets/casino-img/teen3.jpg',
      category: 'teen'
    },
    {
      id: 49,
      image: 'assets/casino-img/teen4.jpg',
      category: 'teen'
    },
    {
      id: 50,
      image: 'assets/casino-img/teen5.webp',
      category: 'teen'
    },
    {
      id: 51,
      image: 'assets/casino-img/teen6.webp',
      category: 'teen'
    },
    {
      id: 52,
      image: 'assets/casino-img/teen7.webp',
      category: 'teen'
    },
    {
      id: 53,
      image: 'assets/casino-img/teen8.webp',
      category: 'teen'
    },
    {
      id: 54,
      image: 'assets/casino-img/teen9.webp',
      category: 'teen'
    },
    {
      id: 55,
      image: 'assets/casino-img/roulette1.webp',
      category: 'roulette'
    },
    {
      id: 56,
      image: 'assets/casino-img/roulette2.webp',
      category: 'roulette'
    },
    {
      id: 57,
      image: 'assets/casino-img/roulette3.webp',
      category: 'roulette'
    },
    {
      id: 58,
      image: 'assets/casino-img/roulette4.webp',
      category: 'roulette'
    },
    {
      id: 59,
      image: 'assets/casino-img/roulette5.webp',
      category: 'roulette'
    },
    {
      id: 60,
      image: 'assets/casino-img/roulette6.webp',
      category: 'roulette'
    },
    {
      id: 61,
      image: 'assets/casino-img/roulette7.webp',
      category: 'roulette'
    },
    {
      id: 62,
      image: 'assets/casino-img/roulette8.webp',
      category: 'roulette'
    },
    {
      id: 63,
      image: 'assets/casino-img/roulette9.jpg',
      category: 'roulette'
    },
    {
      id: 64,
      image: 'assets/casino-img/baccarat1.webp',
      category: 'baccarat'
    },
    {
      id: 65,
      image: 'assets/casino-img/baccarat2.jpg',
      category: 'baccarat'
    },
    {
      id: 66,
      image: 'assets/casino-img/baccarat3.webp',
      category: 'baccarat'
    },
    {
      id: 67,
      image: 'assets/casino-img/baccarat4.webp',
      category: 'baccarat'
    },
    {
      id: 68,
      image: 'assets/casino-img/baccarat5.webp',
      category: 'baccarat'
    },
    {
      id: 69,
      image: 'assets/casino-img/baccarat6.webp',
      category: 'baccarat'
    },
    {
      id: 70,
      image: 'assets/casino-img/baccarat7.webp',
      category: 'baccarat'
    },
    {
      id: 71,
      image: 'assets/casino-img/baccarat8.webp',
      category: 'baccarat'
    },
    {
      id: 72,
      image: 'assets/casino-img/baccarat9.webp',
      category: 'baccarat'
    },

  ];

  @ViewChild('categoryList')
  private categoryList!: ElementRef<HTMLDivElement>;

  protected readonly canScrollLeft = signal(false);
  protected readonly canScrollRight = signal(true);

  ngAfterViewInit(): void {
    this.updateCategoryArrows();
  }

  /**
   * Slide the category list by part of its visible width.
   * direction: 1 = right, -1 = left
   */
  protected scrollCategories(direction: number): void {
    const element = this.categoryList?.nativeElement;

    if (!element) {
      return;
    }

    const distance = element.clientWidth * 0.65;

    element.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  }

  protected updateCategoryArrows(): void {
    const element = this.categoryList?.nativeElement;

    if (!element) {
      return;
    }

    const maxScroll =
      element.scrollWidth - element.clientWidth;

    this.canScrollLeft.set(element.scrollLeft > 2);
    this.canScrollRight.set(element.scrollLeft < maxScroll - 2);
  }

  @HostListener('window:resize')
  protected onCategoryResize(): void {
    this.updateCategoryArrows();
  }

}