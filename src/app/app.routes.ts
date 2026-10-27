import { Routes } from '@angular/router';
import { Football } from './pages/football/football';
import { Tennis } from './pages/tennis/tennis';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Home | Lotus'
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then((m) => m.SearchPage),
    title: 'Search | Lotus'
  },
  {
    path: 'casino',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'casino/:category',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'casino/:category/:gameId',
    loadComponent: () => import('./pages/casino/casino').then((m) => m.CasinoPage),
    title: 'Casino | Lotus',
  },
  {
    path: 'sports',
    loadComponent: () => import('./pages/sports/sports').then((m) => m.Sports),
    children: [
      {
        path: 'league/:leagueId',
        title: 'League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: 'league/:leagueId/match/:matchId',
        title: 'Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },

  {
    path: 'virtual',
    loadComponent: () => import('./pages/virtual-games/virtual-games').then((m) => m.VirtualGames),
    children: [
      {
        path: ':virtualId',
        title: 'Virtual League Details | Lotus',
        loadComponent: () =>
          import('./pages/virtual-games/league-details/league-details').then((m) => m.LeagueDetails),
      },
      {
        path: ':virtualId/match/:matchId',
        title: 'Virtual Match Details | Lotus',
        loadComponent: () =>
          import('./pages/virtual-games/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },

  {
    path: 'football',
    component: Football,
    title: 'Football | Lotus',
    children: [
      {
        path: ':footballId',
        title: 'Football League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':footballId/match/:matchId',
        title: 'Football Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },

  {
    path: 'tennis',
    component: Tennis,
    title: 'Tennis | Lotus',
    children: [
      {
        path: ':tennisId',
        title: 'Tennis League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':tennisId/match/:matchId',
        title: 'Tennis Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },
  {
    path: 'american-football',
    loadComponent: () =>
      import('./pages/american-football/american-football').then((m) => m.AmericanFootball),
    title: 'American Football | Lotus',
    children: [
      {
        path: ':leagueId',
        title: 'American Football League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':leagueId/match/:matchId',
        title: 'American Football Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },
  {
    path: 'basketball',
    loadComponent: () => import('./pages/basketball/basketball').then((m) => m.Basketball),
    title: 'Basketball | Lotus',
    children: [
      {
        path: ':leagueId',
        title: 'Basketball League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':leagueId/match/:matchId',
        title: 'Basketball Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },
  {
    path: 'baseball',
    loadComponent: () => import('./pages/baseball/baseball').then((m) => m.Baseball),
    title: 'Baseball | Lotus',
    children: [
      {
        path: ':leagueId',
        title: 'Baseball League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':leagueId/match/:matchId',
        title: 'Baseball Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },
  {
    path: 'horse-racing',
    loadComponent: () => import('./pages/horseracing/horseracing').then((m) => m.Horseracing),
    title: 'Horse Racing | Lotus',
  },
  {
    path: 'greyhound-racing',
    loadComponent: () =>
      import('./pages/greyhound-racing/greyhound-racing').then((m) => m.GreyhoundRacing),
    title: 'Greyhound Racing | Lotus',
  },
  {
    path: 'mixed-martial-arts',
    loadComponent: () =>
      import('./pages/mixed-martial-arts/mixed-martial-arts').then((m) => m.MixedMartialArts),
    title: 'Mixed Martial Arts | Lotus',
    children: [
      {
        path: ':leagueId',
        title: 'MMA League Details | Lotus',
        loadComponent: () =>
          import('./pages/league-detail/league-detail').then((m) => m.LeagueDetail),
      },
      {
        path: ':leagueId/match/:matchId',
        title: 'MMA Match Details | Lotus',
        loadComponent: () =>
          import('./pages/match-detail/match-detail').then((m) => m.MatchDetail),
      },
    ],
  },

  // settings and sub routes
  {
    path: 'general-settings',
    loadComponent: () =>
      import('./shared/general-settings/general-settings').then((m) => m.GeneralSettings),
    title: 'General Settings | Lotus',
    children: [
      {
        path: 'security',
        title: 'Security | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/security/security').then((m) => m.Security),
      },
      {
        path: 'betslip',
        title: 'Betslip | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/betslip/betslip').then((m) => m.Betslip),
      },
      {
        path: 'one-click-betting',
        title: 'One Click Betting | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/one-click-betting/one-click-betting').then((m) => m.OneClickBetting),
      },
      {
        path: 'minute-market',
        title: 'Minute Market | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/minute-market/minute-market').then((m) => m.MinuteMarket),
      },
      {
        path: 'casino-stakes',
        title: 'Casino Stakes | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/casino-stakes/casino-stakes').then((m) => m.CasinoStakes),
      },
      {
        path: 'notification-center',
        title: 'Security | Lotus',
        loadComponent: () =>
          import('./shared/general-settings/notification-center/notification-center').then((m) => m.NotificationCenter),
      },
    ],
  },

  // my bets
  {
    path: 'my-bets',
    loadComponent: () => import('./pages/my-bets/my-bets').then((m) => m.MyBets),
    title: 'My Bets | Lotus'
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password').then((m) => m.ChangePassword),
    title: 'Change Password | Lotus'
  },
  {
    path: 'reports/profit-loss',
    loadComponent: () => import('./pages/betting-profit-loss/betting-profit-loss').then((m) => m.BettingProfitLoss),
    title: 'Betting: Profit & Loss | Lotus'
  },

  {
    path: 'reports/account-statement',
    loadComponent: () => import('./pages/account-statement/account-statement').then((m) => m.AccountStatement),
    title: 'Account Statement | Lotus'
  },
  {
    path: 'reports/transfer-statement',
    loadComponent: () => import('./pages/transfer-statement/transfer-statement').then((m) => m.TransferStatement),
    title: 'Transfer Statement | Lotus'
  },
  {
    path: 'policies/rules-and-regulations',
    loadComponent: () => import('./pages/rules-and-regulations/rules-and-regulations').then((m) => m.RulesAndRegulations),
    title: 'Rules & Regulations | Lotus'
  },

  {
    path: 'policies/responsible-gambling',
    loadComponent: () => import('./pages/responsible-gambling/responsible-gambling').then((m) => m.ResponsibleGambling),
    title: 'Responsible Gambling | Lotus'
  },
  {
    path: 'policies/kyc',
    loadComponent: () => import('./pages/kyc/kyc').then((m) => m.Kyc),
    title: 'KYC | Lotus'
  },
  {
    path: 'policies/exclusion-policy',
    loadComponent: () => import('./pages/exclusion-policy/exclusion-policy').then((m) => m.ExclusionPolicy),
    title: 'Exclusion Policies | Lotus'
  },
  { path: '**', redirectTo: 'home' },
];