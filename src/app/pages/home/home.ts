import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SportsLayout } from '../../layout/sports-layout/sports-layout';
import { Footer } from '../../layout/footer/footer';

export interface OddItem {
  val: string;
  vol: string;
}

export interface SportEvent {
  league: string;

  hasDraw?: boolean;

  playerOne: string;
  playerTwo: string;

  flagOne?: string;
  flagTwo?: string;

  playerOneImage?: string;
  playerTwoImage?: string;

  dateStr: string;
  timeStr: string;

  score?: string;
  setInfo?: string;
  isLive?: boolean;

  odds: OddItem[];
  extra: string;
}

export interface SportSection {
  id: string;
  title: string;
  icon: string;
  isExpanded: boolean;
  events: SportEvent[];
}

export interface CategoryGroup {
  name: string;
  sections: SportSection[];
}

export interface CasinoGameItem {
  id: string;
  title: string;
  image: string;
  badge?: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, SportsLayout, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  protected activeCategory = 'Live';
  protected casinoExpanded = false;
  private casinoTouchY = 0;

  protected selectCategory(category: string): void {
    this.activeCategory = category;

    if (!this.isMobileViewport()) {
      return;
    }

    requestAnimationFrame(() => {
      const target = document.getElementById(`category-${category.toLowerCase()}`);
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  protected expandCasino(): void {
    if (this.isMobileViewport()) {
      this.casinoExpanded = true;
    }
  }

  protected startCasinoTouch(event: TouchEvent): void {
    this.casinoTouchY = event.touches[0]?.clientY ?? 0;
  }

  protected handleCasinoTouch(event: TouchEvent): void {
    const section = event.currentTarget as HTMLElement;
    const touchY = event.touches[0]?.clientY;

    if (touchY === undefined) {
      return;
    }

    const deltaY = touchY - this.casinoTouchY;
    this.casinoTouchY = touchY;

    if ((section.scrollTop <= 0 && deltaY > 0) ||
      (section.scrollTop + section.clientHeight >= section.scrollHeight - 1 && deltaY < 0)) {
      this.collapseCasino(section);
    }
  }

  protected handleCasinoWheel(event: WheelEvent): void {
    if (!this.isMobileViewport() || !this.casinoExpanded) {
      return;
    }

    const section = event.currentTarget as HTMLElement;
    const atTop = section.scrollTop <= 0;
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 1;
    const reachesTop = section.scrollTop + event.deltaY <= 0;
    const reachesBottom =
      section.scrollTop + section.clientHeight + event.deltaY >= section.scrollHeight - 1;

    if (
      (event.deltaY < 0 && (atTop || reachesTop)) ||
      (event.deltaY > 0 && (atBottom || reachesBottom))
    ) {
      event.preventDefault();
      this.collapseCasino(section);
    }
  }

  protected finishCasinoCollapse(event: TransitionEvent): void {
    const section = event.currentTarget as HTMLElement;

    if (event.target === section && event.propertyName === 'height' && !this.casinoExpanded) {
      section.scrollTop = 0;
    }
  }

  private collapseCasino(section: HTMLElement): void {
    this.casinoExpanded = false;
  }

  private isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  }

  protected collapseCasinoOutside(event: PointerEvent): void {
    const section = (event.currentTarget as HTMLElement).querySelector<HTMLElement>('.top-casino-section');

    if ((event.target as HTMLElement | null)?.closest('.top-casino-section')) {
      return;
    }

    this.casinoExpanded = false;
    if (section) {
      this.collapseCasino(section);
    }
  }

  protected readonly promotions = Array.from(
    { length: 8 },
    (_, index) => ({
      src: `assets/${index + 1}.webp`,
      alt: `Featured promotion ${index + 1}`,
    }),
  );

  protected readonly promotionPages = Array.from(
    { length: Math.ceil(this.promotions.length / 2) },
    (_, index) =>
      this.promotions.slice(index * 2, index * 2 + 2),
  );


  protected readonly casinoGames = [
    {
      title: 'ROULETTE',
      img: '../../../assets/casino/1.webp',
    },
    {
      title: 'BACCARAT',
      img: '../../../assets/casino/2.webp',
    },
    {
      title: 'INSTANT GAMES',
      img: '../../../assets/casino/3.webp',
    },
    {
      title: 'GAME SHOWS',
      img: '../../../assets/casino/4.webp',
    },
    {
      title: 'DRAGON TIGER',
      img: '../../../assets/casino/5.webp',
    },
    {
      title: 'BLACKJACK',
      img: '../../../assets/casino/6.webp',
    },
    {
      title: 'BLACKJACK',
      img: '../../../assets/casino/7.webp',
    },
    {
      title: 'BLACKJACK',
      img: '../../../assets/casino/8.webp',
    }, {
      title: 'BLACKJACK',
      img: '../../../assets/casino/9.webp',
    }, {
      title: 'BLACKJACK',
      img: '../../../assets/casino/10.webp',
    }, {
      title: 'BLACKJACK',
      img: '../../../assets/casino/11.webp',
    }, {
      title: 'BLACKJACK',
      img: '../../../assets/casino/12.webp',
    }, {
      title: 'BLACKJACK',
      img: '../../../assets/casino/13.webp',
    },
    {
      title: 'BLACKJACK',
      img: '../../../assets/casino/14.webp',
    },
  ];


  protected categories: CategoryGroup[] = [

    /* =========================================================
       LIVE
    ========================================================= */

    {
      name: 'Live',

      sections: [

        {
          id: 'tennisCollapse',

          title: 'Tennis',

          icon: 'icon-sport-tennis',

          isExpanded: true,

          events: [

            {
              league: 'ATP Shanghai 2026',

              playerOne: 'Pavel Kotov',
              playerTwo: 'Tallon Griekspoor',

              // Replace these with your real player image paths.
              playerOneImage: '../../../assets/players/1.png',
              playerTwoImage: '../../../assets/players/2.png',

              dateStr: '',
              timeStr: '',

              score: '4:2',
              setInfo: '2nd set',
              isLive: true,

              odds: [
                { val: '1.06', vol: '115,095' },
                { val: '1.07', vol: '149,239' },
                { val: '16.5', vol: '288' },
                { val: '17.5', vol: '756' },
              ],

              extra: '+20',
            },


            {
              league: 'ATP Shanghai 2026',

              playerOne: 'Jaume Munar',
              playerTwo: 'Jenson Brooksby',

              playerOneImage: '../../../assets/players/1.png',
              playerTwoImage: '../../../assets/players/2.png',

              dateStr: '',
              timeStr: '',

              score: '5:6',
              setInfo: '1st set',
              isLive: true,

              odds: [
                { val: '3.25', vol: '5,276' },
                { val: '3.35', vol: '6,888' },
                { val: '1.43', vol: '10,514' },
                { val: '1.44', vol: '6,002' },
              ],

              extra: '+22',
            },


            {
              league: 'ATP Shanghai 2026',

              playerOne: 'Kimmer Coppejans',
              playerTwo: 'Stefanos Tsitsipas',

              playerOneImage: '../../../assets/players/1.png',
              playerTwoImage: '../../../assets/players/2.png',

              dateStr: '',
              timeStr: '',

              score: '4:3',
              setInfo: '2nd set',
              isLive: true,

              odds: [
                { val: '13.5', vol: '126' },
                { val: '14.5', vol: '53' },
                { val: '1.07', vol: '9,464' },
                { val: '1.08', vol: '1,578' },
              ],

              extra: '+13',
            },


            {
              league: 'WTA Beijing 2026',

              playerOne: 'Karolina Muchova',
              playerTwo: 'Naomi Osaka',

              playerOneImage: '../../../assets/players/1.png',
              playerTwoImage: '../../../assets/players/2.png',

              dateStr: '',
              timeStr: '',

              score: '',
              setInfo: '3rd set',
              isLive: true,

              odds: [
                { val: '1.64', vol: '22,096' },
                { val: '1.66', vol: '21,585' },
                { val: '2.50', vol: '14,527' },
                { val: '2.54', vol: '2,650' },
              ],

              extra: '+20',
            },

          ],
        },


        {
          id: 'baseballCollapse',

          title: 'Baseball',

          icon: 'icon-sport-baseball',

          isExpanded: false,

          events: [],
        },

      ],
    },

    {
      name: 'Upcoming',

      sections: [

        /* ---------------- CRICKET ---------------- */

        {
          id: 'cricketCollapse',

          title: 'Cricket',

          icon: 'icon-sport-cricket',

          isExpanded: true,

          events: [

            {
              league: 'International Twenty20 Matches',

              playerOne: 'India',
              playerTwo: 'West Indies',

              flagOne: '🇮🇳',
              flagTwo: '🇭🇹',

              dateStr: 'Today',
              timeStr: '19:00',

              odds: [
                { val: '1.28', vol: '52,529' },
                { val: '1.29', vol: '252,239' },
                { val: '4.50', vol: '1,953' },
                { val: '4.60', vol: '23,385' },
              ],

              extra: '+79',
            },


            {
              league: 'International Twenty20 Matches',

              playerOne: 'Pakistan',
              playerTwo: 'Sri Lanka',

              flagOne: '🇵🇰',
              flagTwo: '🇱🇰',

              dateStr: '09/10/2026',
              timeStr: '20:30',

              odds: [
                { val: '1.47', vol: '283' },
                { val: '1.84', vol: '40' },
                { val: '2.18', vol: '34' },
                { val: '3.10', vol: '35' },
              ],

              extra: '+1',
            },


            {
              league: 'Test Matches',

              hasDraw: true,

              playerOne: 'South Africa',
              playerTwo: 'Australia',

              flagOne: '🇿🇦',
              flagTwo: '🇦🇺',

              dateStr: '09/10/2026',
              timeStr: '13:30',

              odds: [
                { val: '2.28', vol: '4,044' },
                { val: '2.30', vol: '7,581' },
                { val: '11.0', vol: '1,785' },
                { val: '12.0', vol: '283' },
                { val: '2.08', vol: '1,284' },
                { val: '2.12', vol: '1,828' },
              ],

              extra: '+3',
            },


            {
              league: 'Womens One Day Internationals',

              playerOne: 'Australia W',
              playerTwo: 'Bangladesh W',

              flagOne: '🇦🇺',
              flagTwo: '🇧🇩',

              dateStr: '09/10/2026',
              timeStr: '09:20',

              odds: [
                { val: '1.01', vol: '217,392' },
                { val: '1.02', vol: '81,179' },
                { val: '60', vol: '39' },
                { val: '90', vol: '38' },
              ],

              extra: '+1',
            },

          ],
        },


        /* ---------------- FOOTBALL ---------------- */

        {
          id: 'footballCollapse',

          title: 'Football',

          icon: 'icon-sport-football',

          isExpanded: true,

          events: [

            {
              league: 'UEFA Nations League A',

              hasDraw: true,

              playerOne: 'England',
              playerTwo: 'Czechia',

              flagOne: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
              flagTwo: '🇨🇿',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '1.13', vol: '328,054' },
                { val: '1.14', vol: '37,714' },
                { val: '11.5', vol: '278' },
                { val: '12.0', vol: '3,583' },
                { val: '30', vol: '679' },
                { val: '32', vol: '1,546' },
              ],

              extra: '+47',
            },


            {
              league: 'UEFA Nations League A',

              hasDraw: true,

              playerOne: 'Croatia',
              playerTwo: 'Spain',

              flagOne: '🇭🇷',
              flagTwo: '🇪🇸',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '11.0', vol: '2,975' },
                { val: '11.5', vol: '1,199' },
                { val: '6.60', vol: '6,097' },
                { val: '7.00', vol: '7,947' },
                { val: '1.30', vol: '35,983' },
                { val: '1.32', vol: '64,672' },
              ],

              extra: '+47',
            },


            {
              league: 'UEFA Nations League B',

              hasDraw: true,

              playerOne: 'Scotland',
              playerTwo: 'Slovenia',

              flagOne: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
              flagTwo: '🇸🇮',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '1.91', vol: '10,697' },
                { val: '1.92', vol: '17,424' },
                { val: '3.45', vol: '11,914' },
                { val: '3.50', vol: '1,472' },
                { val: '5.20', vol: '1,787' },
                { val: '5.30', vol: '1,980' },
              ],

              extra: '+47',
            },


            {
              league: 'Spanish La Liga',

              hasDraw: true,

              playerOne: 'Barcelona',
              playerTwo: 'Getafe',

              flagOne: '🇪🇸',
              flagTwo: '🇪🇸',

              dateStr: '10/10/2026',
              timeStr: '22:00',

              odds: [
                { val: '1.08', vol: '500,000+' },
                { val: '1.09', vol: '103,403' },
                { val: '20', vol: '197' },
                { val: '22', vol: '378' },
                { val: '34', vol: '2,139' },
                { val: '36', vol: '46' },
              ],

              extra: '+1',
            },


            {
              league: 'UEFA Nations League C',

              hasDraw: true,

              playerOne: 'Albania',
              playerTwo: 'San Marino',

              flagOne: '🇦🇱',
              flagTwo: '🇸🇲',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '1.03', vol: '144,211' },
                { val: '1.04', vol: '76,409' },
                { val: '36', vol: '57' },
                { val: '40', vol: '537' },
                { val: '100', vol: '104' },
                { val: '120', vol: '197' },
              ],

              extra: '+47',
            },


            {
              league: 'UEFA Nations League C',

              hasDraw: true,

              playerOne: 'Estonia',
              playerTwo: 'Iceland',

              flagOne: '🇪🇪',
              flagTwo: '🇮🇸',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '6.40', vol: '986' },
                { val: '6.60', vol: '441' },
                { val: '4.30', vol: '355' },
                { val: '4.40', vol: '3,423' },
                { val: '1.62', vol: '5,106' },
                { val: '1.64', vol: '4,851' },
              ],

              extra: '+47',
            },


            {
              league: 'English Premier League',

              hasDraw: true,

              playerOne: 'Liverpool',
              playerTwo: 'Man City',

              flagOne: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
              flagTwo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',

              dateStr: '11/10/2026',
              timeStr: '21:00',

              odds: [
                { val: '2.68', vol: '6,388' },
                { val: '2.72', vol: '4,959' },
                { val: '3.90', vol: '2,429' },
                { val: '3.95', vol: '28,453' },
                { val: '2.66', vol: '11,580' },
                { val: '2.68', vol: '13' },
              ],

              extra: '+1',
            },


            {
              league: 'UEFA Nations League B',

              hasDraw: true,

              playerOne: 'Switzerland',
              playerTwo: 'North Macedonia',

              flagOne: '🇨🇭',
              flagTwo: '🇲🇰',

              dateStr: 'Tomorrow',
              timeStr: '00:15',

              odds: [
                { val: '1.10', vol: '207,832' },
                { val: '1.11', vol: '93,567' },
                { val: '13.0', vol: '2,312' },
                { val: '14.0', vol: '1,591' },
                { val: '50', vol: '287' },
                { val: '55', vol: '106' },
              ],

              extra: '+47',
            },

          ],
        },


        /* ---------------- TENNIS ---------------- */

        {
          id: 'tennisCollapse',

          title: 'Tennis',

          icon: 'icon-sport-tennis',

          isExpanded: true,

          events: [

            {
              league: 'ATP Beijing 2026',

              playerOne: 'Novak Djokovic',
              playerTwo: 'Alex De Minaur',

              dateStr: 'Today',
              timeStr: '16:30',

              odds: [
                { val: '1.61', vol: '71,738' },
                { val: '1.63', vol: '49,274' },
                { val: '2.60', vol: '6,588' },
                { val: '2.64', vol: '45,703' },
              ],

              extra: '+14',
            },


            {
              league: 'WTA Beijing 2026',

              playerOne: 'Sinja Kraus',
              playerTwo: 'Nikola Bartunkova',

              dateStr: 'Today',
              timeStr: '15:35',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+14',
            },


            {
              league: 'WTA Suzhou 2026',

              playerOne: 'Jia-Jing Lu',
              playerTwo: 'Tamara Korpatsch',

              dateStr: 'Today',
              timeStr: '16:30',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+18',
            },


            {
              league: 'ATP Shanghai 2026',

              playerOne: 'Pavel Kotov',
              playerTwo: 'Aleksandar Vukic',

              dateStr: 'Today',
              timeStr: '16:12',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+17',
            },


            {
              league: 'Villena Challenger 2026',

              playerOne: 'Abdullah Shelbayh',
              playerTwo: 'David Jorda Sanchis',

              dateStr: '',
              timeStr: '',

              odds: [
                { val: '1.729', vol: '1,729' },
                { val: '1.834', vol: '1,834' },
                { val: '2.200', vol: '2,200' },
                { val: '2.372', vol: '2,372' },
              ],

              extra: '+16',
            },


            {
              league: 'WTA Samsun 2026',

              playerOne: 'Lucrezia Stefanini',
              playerTwo: 'Carole Monnet',

              dateStr: '',
              timeStr: '',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+14',
            },

          ],
        },


        /* ---------------- BASKETBALL ---------------- */

        {
          id: 'basketballCollapse',

          title: 'Basketball',

          icon: 'icon-sport-basketball',

          isExpanded: true,

          events: [

            {
              league: 'WNBA',

              playerOne: 'Atlanta Dream',
              playerTwo: 'New York Liberty',

              dateStr: '08/10/2026',
              timeStr: '05:00',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+17',
            },


            {
              league: 'WNBA',

              playerOne: 'Golden State Valkyries',
              playerTwo: 'Las Vegas Aces',

              dateStr: '08/10/2026',
              timeStr: '07:00',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+17',
            },


            {
              league: 'NBA',

              playerOne: 'Detroit Pistons',
              playerTwo: 'Boston Celtics',

              dateStr: '21/10/2026',
              timeStr: '00:30',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+25',
            },

          ],
        },


        /* ---------------- AMERICAN FOOTBALL ---------------- */

        {
          id: 'americanFootballCollapse',

          title: 'American Football',

          icon: 'icon-sport-americanfootball',

          isExpanded: true,

          events: [

            {
              league: 'NCAA',

              playerOne: 'Troy',
              playerTwo: 'Southern Miss',

              dateStr: 'Tomorrow',
              timeStr: '05:30',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+23',
            },


            {
              league: 'NCAA',

              playerOne: 'Kennesaw State',
              playerTwo: 'Jacksonville State',

              dateStr: '08/10/2026',
              timeStr: '04:30',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+22',
            },


            {
              league: 'NCAA',

              playerOne: 'Florida International',
              playerTwo: 'New Mexico State',

              dateStr: '08/10/2026',
              timeStr: '05:00',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+23',
            },

          ],
        },


        /* ---------------- BASEBALL ---------------- */

        {
          id: 'baseballCollapse',

          title: 'Baseball',

          icon: 'icon-sport-baseball',

          isExpanded: true,

          events: [

            {
              league: 'Chinese Taipei - Professional League',

              playerOne: 'Rakuten Monkeys',
              playerTwo: 'Fubon Guardians',

              dateStr: 'Today',
              timeStr: '16:05',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+15',
            },


            {
              league: 'MLB',

              playerOne: 'Atlanta Braves',
              playerTwo: 'Los Angeles Dodgers',

              dateStr: 'Tomorrow',
              timeStr: '03:30',

              odds: [
                { val: '5.40', vol: '822' },
                { val: '5.50', vol: '506' },
                { val: '1.22', vol: '62,367' },
                { val: '1.23', vol: '15,890' },
              ],

              extra: '+32',
            },

          ],
        },

      ],
    },

  ];


  protected toggleSection(section: SportSection): void {
    section.isExpanded = !section.isExpanded;
  }


  protected scrollGames(
    container: HTMLElement,
    distance: number,
  ): void {
    container.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }


  protected readonly topCasinoGames: CasinoGameItem[] = [

    {
      id: '1',
      title: 'Aviator',
      image: '../../../assets/casino-games/1.webp',
    },

    {
      id: '2',
      title: 'Dragon Tiger',
      image: '../../../assets/casino-games/2.webp',
    },

    {
      id: '3',
      title: '12 Coins',
      image: '../../../assets/casino-games/3.webp',
    },

    {
      id: '4',
      title: 'Teen Patti 20 20',
      image: '../../../assets/casino-games/4.webp',
    },

    {
      id: '5',
      title: 'Blackjack Live',
      image: '../../../assets/casino-games/5.webp',
    },

    {
      id: '6',
      title: 'No Commission Baccarat',
      image: '../../../assets/casino-games/6.webp',
    },

    {
      id: '7',
      title: '3 Bombay Blackjack',
      image: '../../../assets/casino-games/7.jpg',
    },

    {
      id: '8',
      title: 'Roulette Live',
      image: '../../../assets/casino-games/8.webp',
    },

    {
      id: '9',
      title: '32 Cards',
      image: '../../../assets/casino-games/9.webp',
    },

    {
      id: '10',
      title: 'XXXtreme Lightning Roulette',
      image: '../../../assets/casino-games/10.webp',
    },

    {
      id: '11',
      title: 'Red Door Roulette Live',
      image: '../../../assets/casino-games/11.webp',
    },

    {
      id: '12',
      title: 'Auto-Roulette',
      image: '../../../assets/casino-games/12.webp',
    },

    {
      id: '13',
      title: 'Lightning Roulette',
      image: '../../../assets/casino-games/13.webp',
    },

    {
      id: '14',
      title: 'Lightning Sic Bo',
      image: '../../../assets/casino-games/14.webp',
    },

    {
      id: '15',
      title: 'Speed Roulette Live',
      image: '../../../assets/casino-games/15.webp',
    },

    {
      id: '16',
      title: 'Immersive Roulette',
      image: '../../../assets/casino-games/16.webp',
    },

    {
      id: '17',
      title: 'Crazy Time',
      image: '../../../assets/casino-games/17.webp',
    },

    {
      id: '18',
      title: 'Roulette',
      image: '../../../assets/casino-games/18.webp',
    },

    {
      id: '19',
      title: 'Lightning Baccarat',
      image: '../../../assets/casino-games/19.webp',
    },

    {
      id: '20',
      title: 'Lightning Storm Live',
      image: '../../../assets/casino-games/20.webp',
    },

    {
      id: '21',
      title: 'Mines',
      image: '../../../assets/casino-games/21.webp',
    },

    {
      id: '22',
      title: 'Vortex',
      image: '../../../assets/casino-games/22.webp',
    },

    {
      id: '23',
      title: 'Good Girl Bad Girl',
      image: '../../../assets/casino-games/23.webp',
    },

    {
      id: '24',
      title: 'Crazy Balls',
      image: '../../../assets/casino-games/24.webp',
    },
    {
      id: '25',
      title: 'Monopoly Big Baller',
      image: '../../../assets/casino-games/25.webp',
    },

    {
      id: '26',
      title: 'Stacked',
      image: '../../../assets/casino-games/26.webp',
    },

    {
      id: '27',
      title: 'Coin Strike',
      image: '../../../assets/casino-games/27.webp',
    },

    {
      id: '28',
      title: 'Ball & Ball',
      image: '../../../assets/casino-games/28.webp',
    },

    {
      id: '29',
      title: 'Plinko X',
      image: '../../../assets/casino-games/29.webp',
    },

    {
      id: '30',
      title: 'Live Casino Host',
      image: '../../../assets/casino-games/30.webp',
    },


    {
      id: '31',
      title: 'Monopoly Big Baller',
      image: '../../../assets/casino-games/31.webp',
    },

    {
      id: '32',
      title: 'Stacked',
      image: '../../../assets/casino-games/32.webp',
    },

    {
      id: '33',
      title: 'Coin Strike',
      image: '../../../assets/casino-games/33.jpg',
    },

    {
      id: '34',
      title: 'Ball & Ball',
      image: '../../../assets/casino-games/34.jpg',
    },

    {
      id: '35',
      title: 'Plinko X',
      image: '../../../assets/casino-games/35.jpg',
    },

    {
      id: '36',
      title: 'Live Casino Host',
      image: '../../../assets/casino-games/36.webp',
    },
  ];
}
