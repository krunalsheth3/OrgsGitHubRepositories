'use strict'

angular.module('orgReposApp')
.controller('CommitsListCtrl', function($scope, $meteor, $stateParams) {
  $scope.page = 1;
  $scope.perPage = 3;
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1';


  /*
   * Fetch the list of commits for of that particular repo
   */
  $meteor.call('fetchCommits',$stateParams.orgName, $stateParams.repoName).then(
      function(data) {
        console.log(data);
        $scope.commits = data;
      },
      function(err) {
        console.log("Error in fetchRepos");
      }
  );

  // $scope.commits = [
  //   {
  //     "sha": "0b685fb312577a4e88597feb427cf9224935d0fd",
  //     "commit": {
  //       "author": {
  //         "name": "Drew Folta",
  //         "email": "drew@folta.net",
  //         "date": "2014-07-21T16:07:48Z"
  //       },
  //       "committer": {
  //         "name": "Drew Folta",
  //         "email": "drew@folta.net",
  //         "date": "2014-07-21T16:07:48Z"
  //       },
  //       "message": "Merge pull request #3 from syamvilakudy/patch-1\n\nUpdated yahoo.inc",
  //       "tree": {
  //         "sha": "b020ecb218c527e1757fe618948132cdf3077cfb",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/b020ecb218c527e1757fe618948132cdf3077cfb"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/0b685fb312577a4e88597feb427cf9224935d0fd",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/0b685fb312577a4e88597feb427cf9224935d0fd",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/0b685fb312577a4e88597feb427cf9224935d0fd",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/0b685fb312577a4e88597feb427cf9224935d0fd/comments",
  //     "author": {
  //       "login": "drewfish",
  //       "id": 447478,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/447478?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/drewfish",
  //       "html_url": "https://github.com/drewfish",
  //       "followers_url": "https://api.github.com/users/drewfish/followers",
  //       "following_url": "https://api.github.com/users/drewfish/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/drewfish/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/drewfish/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/drewfish/subscriptions",
  //       "organizations_url": "https://api.github.com/users/drewfish/orgs",
  //       "repos_url": "https://api.github.com/users/drewfish/repos",
  //       "events_url": "https://api.github.com/users/drewfish/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/drewfish/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "drewfish",
  //       "id": 447478,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/447478?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/drewfish",
  //       "html_url": "https://github.com/drewfish",
  //       "followers_url": "https://api.github.com/users/drewfish/followers",
  //       "following_url": "https://api.github.com/users/drewfish/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/drewfish/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/drewfish/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/drewfish/subscriptions",
  //       "organizations_url": "https://api.github.com/users/drewfish/orgs",
  //       "repos_url": "https://api.github.com/users/drewfish/repos",
  //       "events_url": "https://api.github.com/users/drewfish/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/drewfish/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684"
  //       },
  //       {
  //         "sha": "8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/8a3a6afdd59244ab7c580459576b1158d43cb7db"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //     "commit": {
  //       "author": {
  //         "name": "Syam Mohan",
  //         "email": "syamvilakudy@gmail.com",
  //         "date": "2014-07-18T11:21:15Z"
  //       },
  //       "committer": {
  //         "name": "Syam Mohan",
  //         "email": "syamvilakudy@gmail.com",
  //         "date": "2014-07-18T11:21:15Z"
  //       },
  //       "message": "Updated yahoo.inc\n\nIn current update yahoo allowing access to contact api only through \"https\". So we need to change \"yahoo.inc\" file. Replace all \"http\" by \"https\" protocol.",
  //       "tree": {
  //         "sha": "b020ecb218c527e1757fe618948132cdf3077cfb",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/b020ecb218c527e1757fe618948132cdf3077cfb"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/8a3a6afdd59244ab7c580459576b1158d43cb7db",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8a3a6afdd59244ab7c580459576b1158d43cb7db/comments",
  //     "author": null,
  //     "committer": null,
  //     "parents": [
  //       {
  //         "sha": "bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //     "commit": {
  //       "author": {
  //         "name": "Jonathan LeBlanc",
  //         "email": "joncleblanc@yahoo.com",
  //         "date": "2011-02-25T00:15:42Z"
  //       },
  //       "committer": {
  //         "name": "Jonathan LeBlanc",
  //         "email": "joncleblanc@yahoo.com",
  //         "date": "2011-02-25T00:15:42Z"
  //       },
  //       "message": "added deprecation warning to README",
  //       "tree": {
  //         "sha": "61a5e3108f0ffcc7a5c4627f6d7815dbab7a5f2e",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/61a5e3108f0ffcc7a5c4627f6d7815dbab7a5f2e"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bdd2d8d2bb3276f1771a4832a9af2c4fdd27b684/comments",
  //     "author": {
  //       "login": "jcleblanc",
  //       "id": 104491,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/104491?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/jcleblanc",
  //       "html_url": "https://github.com/jcleblanc",
  //       "followers_url": "https://api.github.com/users/jcleblanc/followers",
  //       "following_url": "https://api.github.com/users/jcleblanc/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/jcleblanc/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/jcleblanc/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/jcleblanc/subscriptions",
  //       "organizations_url": "https://api.github.com/users/jcleblanc/orgs",
  //       "repos_url": "https://api.github.com/users/jcleblanc/repos",
  //       "events_url": "https://api.github.com/users/jcleblanc/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/jcleblanc/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "jcleblanc",
  //       "id": 104491,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/104491?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/jcleblanc",
  //       "html_url": "https://github.com/jcleblanc",
  //       "followers_url": "https://api.github.com/users/jcleblanc/followers",
  //       "following_url": "https://api.github.com/users/jcleblanc/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/jcleblanc/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/jcleblanc/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/jcleblanc/subscriptions",
  //       "organizations_url": "https://api.github.com/users/jcleblanc/orgs",
  //       "repos_url": "https://api.github.com/users/jcleblanc/repos",
  //       "events_url": "https://api.github.com/users/jcleblanc/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/jcleblanc/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/12c4a50a2cda808d2a75abb60870eb861fe48a5e"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-12-15T01:21:38Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-12-15T01:21:38Z"
  //       },
  //       "message": "added CHANGELOG to track version changes",
  //       "tree": {
  //         "sha": "4ab5987bc8a515103e6daab5170e3eb99d99c499",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/4ab5987bc8a515103e6daab5170e3eb99d99c499"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //       "comment_count": 1
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/12c4a50a2cda808d2a75abb60870eb861fe48a5e",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/12c4a50a2cda808d2a75abb60870eb861fe48a5e/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "db0c17f70671616f1d42103de22210a96ea6c073",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/db0c17f70671616f1d42103de22210a96ea6c073",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/db0c17f70671616f1d42103de22210a96ea6c073"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "db0c17f70671616f1d42103de22210a96ea6c073",
  //     "commit": {
  //       "author": {
  //         "name": "Bart Teeuwisse",
  //         "email": "bart.teeuwisse@thecodemill.biz",
  //         "date": "2009-11-30T20:27:07Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-11-30T22:27:00Z"
  //       },
  //       "message": "- Global variables need to be defined before assigning values.",
  //       "tree": {
  //         "sha": "0a281ad0226cce4aee9b3d73acf1b7a75c311183",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/0a281ad0226cce4aee9b3d73acf1b7a75c311183"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/db0c17f70671616f1d42103de22210a96ea6c073",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/db0c17f70671616f1d42103de22210a96ea6c073",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/db0c17f70671616f1d42103de22210a96ea6c073",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/db0c17f70671616f1d42103de22210a96ea6c073/comments",
  //     "author": null,
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "9f75aa928698127e91a5e99b769e2185ec937043",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9f75aa928698127e91a5e99b769e2185ec937043",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/9f75aa928698127e91a5e99b769e2185ec937043"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "9f75aa928698127e91a5e99b769e2185ec937043",
  //     "commit": {
  //       "author": {
  //         "name": "Bart Teeuwisse",
  //         "email": "bart.teeuwisse@thecodemill.biz",
  //         "date": "2009-11-26T01:35:28Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-11-29T07:50:02Z"
  //       },
  //       "message": "- Interface function are not allowed to have bodies, breaks php lint.",
  //       "tree": {
  //         "sha": "36e70611a09f58c5a1ed24efbdddc7066685c1e1",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/36e70611a09f58c5a1ed24efbdddc7066685c1e1"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/9f75aa928698127e91a5e99b769e2185ec937043",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9f75aa928698127e91a5e99b769e2185ec937043",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/9f75aa928698127e91a5e99b769e2185ec937043",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9f75aa928698127e91a5e99b769e2185ec937043/comments",
  //     "author": null,
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-11-11T00:26:08Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-11-11T00:26:08Z"
  //       },
  //       "message": "fixed debug log to use error_log",
  //       "tree": {
  //         "sha": "d0672f6aa7f68b7d1c906190025087ef76530bbb",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/d0672f6aa7f68b7d1c906190025087ef76530bbb"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1b1dccd91264412d1eaaf9d0b26aa47cd90eb0a2/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-22T19:57:16Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-22T19:57:16Z"
  //       },
  //       "message": "updated phpdoc api documentation",
  //       "tree": {
  //         "sha": "bd29bffe0ada0cc1bbbae2b049c332afa85634c1",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/bd29bffe0ada0cc1bbbae2b049c332afa85634c1"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b4b105cdf124b2d809e1df01dd767bcc5d8d9d0a/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/6258711fb463b7ec06f6f2bb12f0fbbe092d759e"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-22T19:56:49Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-22T19:56:49Z"
  //       },
  //       "message": "converted error_log calls to use YahooLogger + changed tabs to spaces",
  //       "tree": {
  //         "sha": "b7b4a4037a12481adfe6ac314477a698623ff4e5",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/b7b4a4037a12481adfe6ac314477a698623ff4e5"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/6258711fb463b7ec06f6f2bb12f0fbbe092d759e",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/6258711fb463b7ec06f6f2bb12f0fbbe092d759e/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/2a050613c264786396aa5c4fd8d58ef0cda1f65d"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-09T18:32:34Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-09T18:32:34Z"
  //       },
  //       "message": "added constructor for NativeSessionStore to auto start sessions",
  //       "tree": {
  //         "sha": "8439183a7db7e22a26be129f1661de389277055f",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/8439183a7db7e22a26be129f1661de389277055f"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/2a050613c264786396aa5c4fd8d58ef0cda1f65d",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2a050613c264786396aa5c4fd8d58ef0cda1f65d/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "f18c8b4675df57578946c3254a7974f4759f00fe",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/f18c8b4675df57578946c3254a7974f4759f00fe",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/f18c8b4675df57578946c3254a7974f4759f00fe"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "f18c8b4675df57578946c3254a7974f4759f00fe",
  //     "commit": {
  //       "author": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:43:38Z"
  //       },
  //       "committer": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:43:38Z"
  //       },
  //       "message": "updated readme",
  //       "tree": {
  //         "sha": "a2664ce4738ed2357a3a9301267d64de86f7f72b",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/a2664ce4738ed2357a3a9301267d64de86f7f72b"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/f18c8b4675df57578946c3254a7974f4759f00fe",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/f18c8b4675df57578946c3254a7974f4759f00fe",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/f18c8b4675df57578946c3254a7974f4759f00fe",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/f18c8b4675df57578946c3254a7974f4759f00fe/comments",
  //     "author": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "3d03307dc90de0d444290de578cc6b3e39ad5116",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/3d03307dc90de0d444290de578cc6b3e39ad5116",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/3d03307dc90de0d444290de578cc6b3e39ad5116"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "3d03307dc90de0d444290de578cc6b3e39ad5116",
  //     "commit": {
  //       "author": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:42:48Z"
  //       },
  //       "committer": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:42:48Z"
  //       },
  //       "message": "adding sample for adding contacts",
  //       "tree": {
  //         "sha": "f1c21785ef2d79533c72c01ecc0cf5bec2bc7373",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/f1c21785ef2d79533c72c01ecc0cf5bec2bc7373"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/3d03307dc90de0d444290de578cc6b3e39ad5116",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/3d03307dc90de0d444290de578cc6b3e39ad5116",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/3d03307dc90de0d444290de578cc6b3e39ad5116",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/3d03307dc90de0d444290de578cc6b3e39ad5116/comments",
  //     "author": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/b85e449ba9c067ebf1c0f251e686703cb3e1f010"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //     "commit": {
  //       "author": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:33:54Z"
  //       },
  //       "committer": {
  //         "name": "basictheory",
  //         "email": "zagraves@gmail.com",
  //         "date": "2009-10-09T00:33:54Z"
  //       },
  //       "message": "adding contacts write/sync. addContact, getContactSync, syncContacts, getContact",
  //       "tree": {
  //         "sha": "2617d2f60cd89f058f644e5baba64c0613095704",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/2617d2f60cd89f058f644e5baba64c0613095704"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/b85e449ba9c067ebf1c0f251e686703cb3e1f010",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/b85e449ba9c067ebf1c0f251e686703cb3e1f010/comments",
  //     "author": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "zagraves",
  //       "id": 17771,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/17771?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/zagraves",
  //       "html_url": "https://github.com/zagraves",
  //       "followers_url": "https://api.github.com/users/zagraves/followers",
  //       "following_url": "https://api.github.com/users/zagraves/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/zagraves/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/zagraves/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/zagraves/subscriptions",
  //       "organizations_url": "https://api.github.com/users/zagraves/orgs",
  //       "repos_url": "https://api.github.com/users/zagraves/repos",
  //       "events_url": "https://api.github.com/users/zagraves/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/zagraves/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "1421c81cae663b8282c291b2705cf432712822fb",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1421c81cae663b8282c291b2705cf432712822fb",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/1421c81cae663b8282c291b2705cf432712822fb"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "1421c81cae663b8282c291b2705cf432712822fb",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:41:14Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:41:14Z"
  //       },
  //       "message": "changed phpdoc package name to be consistent: yos-social-php",
  //       "tree": {
  //         "sha": "4152f50153070ccb01889df0e8663f75d5f053b8",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/4152f50153070ccb01889df0e8663f75d5f053b8"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/1421c81cae663b8282c291b2705cf432712822fb",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1421c81cae663b8282c291b2705cf432712822fb",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/1421c81cae663b8282c291b2705cf432712822fb",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/1421c81cae663b8282c291b2705cf432712822fb/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:32:54Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:32:54Z"
  //       },
  //       "message": "updated phpdoc documentation + added phpdoc configuration file",
  //       "tree": {
  //         "sha": "73d6d31639a54d443c28d0f6ac622978bf112169",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/73d6d31639a54d443c28d0f6ac622978bf112169"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ce20e0fcd9c49039ccc7e056548ab8595fabc7a4/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/9e7b26271ab781538e83a24b3c8bba23f8c64aaf"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:31:48Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T22:31:48Z"
  //       },
  //       "message": "changed tabs to two spaces for consistency",
  //       "tree": {
  //         "sha": "a0e572a2779b40af5c24d15af9de397b216e2867",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/a0e572a2779b40af5c24d15af9de397b216e2867"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/9e7b26271ab781538e83a24b3c8bba23f8c64aaf",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9e7b26271ab781538e83a24b3c8bba23f8c64aaf/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T21:21:27Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-10-04T21:21:27Z"
  //       },
  //       "message": "fixed response code handling",
  //       "tree": {
  //         "sha": "78b764e4f23b5afe91d069c2718bfb07518c0b9a",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/78b764e4f23b5afe91d069c2718bfb07518c0b9a"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ecdd950949cbc1d9fc9386cfbccbc76fb7dde8a2/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "7f4a89cbe42e627ce3600f755820e53bc09634df",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/7f4a89cbe42e627ce3600f755820e53bc09634df",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/7f4a89cbe42e627ce3600f755820e53bc09634df"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "7f4a89cbe42e627ce3600f755820e53bc09634df",
  //     "commit": {
  //       "author": {
  //         "name": "Chirag Shah",
  //         "email": "chiragshah1@gmail.com",
  //         "date": "2009-09-30T22:32:18Z"
  //       },
  //       "committer": {
  //         "name": "Chirag Shah",
  //         "email": "chiragshah1@gmail.com",
  //         "date": "2009-09-30T22:32:18Z"
  //       },
  //       "message": "Include the Content-Type header in OAuthUtil::get_headers() for people who don't have apache_request_headers available to them.",
  //       "tree": {
  //         "sha": "d183bddc07dd8fe800f248726bca0093d2df9d97",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/d183bddc07dd8fe800f248726bca0093d2df9d97"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/7f4a89cbe42e627ce3600f755820e53bc09634df",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/7f4a89cbe42e627ce3600f755820e53bc09634df",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/7f4a89cbe42e627ce3600f755820e53bc09634df",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/7f4a89cbe42e627ce3600f755820e53bc09634df/comments",
  //     "author": {
  //       "login": "chirags",
  //       "id": 20352,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/20352?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chirags",
  //       "html_url": "https://github.com/chirags",
  //       "followers_url": "https://api.github.com/users/chirags/followers",
  //       "following_url": "https://api.github.com/users/chirags/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chirags/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chirags/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chirags/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chirags/orgs",
  //       "repos_url": "https://api.github.com/users/chirags/repos",
  //       "events_url": "https://api.github.com/users/chirags/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chirags/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "chirags",
  //       "id": 20352,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/20352?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chirags",
  //       "html_url": "https://github.com/chirags",
  //       "followers_url": "https://api.github.com/users/chirags/followers",
  //       "following_url": "https://api.github.com/users/chirags/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chirags/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chirags/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chirags/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chirags/orgs",
  //       "repos_url": "https://api.github.com/users/chirags/repos",
  //       "events_url": "https://api.github.com/users/chirags/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chirags/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/0cea94b737ec9f0703b765135d9e6fda379c3b4f"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-30T09:46:48Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-30T09:46:48Z"
  //       },
  //       "message": "add examples to README + tweaked examples for notices",
  //       "tree": {
  //         "sha": "0e1b1bde3c831b12ef05b58501b94803e52be03e",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/0e1b1bde3c831b12ef05b58501b94803e52be03e"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/0cea94b737ec9f0703b765135d9e6fda379c3b4f",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/0cea94b737ec9f0703b765135d9e6fda379c3b4f/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "2bce49e177ae319af55e325ed008e45e344e28f5",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2bce49e177ae319af55e325ed008e45e344e28f5",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/2bce49e177ae319af55e325ed008e45e344e28f5"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "2bce49e177ae319af55e325ed008e45e344e28f5",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-30T09:46:23Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-30T09:46:23Z"
  //       },
  //       "message": "fixed response code handling",
  //       "tree": {
  //         "sha": "4278ac1e3d5cef57acd603c7bd22dd5f5314c49c",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/4278ac1e3d5cef57acd603c7bd22dd5f5314c49c"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/2bce49e177ae319af55e325ed008e45e344e28f5",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2bce49e177ae319af55e325ed008e45e344e28f5",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/2bce49e177ae319af55e325ed008e45e344e28f5",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/2bce49e177ae319af55e325ed008e45e344e28f5/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/bb134238d6f0826c1ddd9889e638a7a12c32a0e8"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:59:55Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:59:55Z"
  //       },
  //       "message": "fixed formatting of README",
  //       "tree": {
  //         "sha": "65a4298dc3d3bff6d36a620ca1b0825d389eff92",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/65a4298dc3d3bff6d36a620ca1b0825d389eff92"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/bb134238d6f0826c1ddd9889e638a7a12c32a0e8",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/bb134238d6f0826c1ddd9889e638a7a12c32a0e8/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "e4f42d158f23b41c01938f086f44443b6cb17266",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/e4f42d158f23b41c01938f086f44443b6cb17266",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/e4f42d158f23b41c01938f086f44443b6cb17266"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "e4f42d158f23b41c01938f086f44443b6cb17266",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:50:39Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:50:39Z"
  //       },
  //       "message": " removed old docs",
  //       "tree": {
  //         "sha": "178f107e68b21d76393c1abef2874d391a87a7c5",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/178f107e68b21d76393c1abef2874d391a87a7c5"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/e4f42d158f23b41c01938f086f44443b6cb17266",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/e4f42d158f23b41c01938f086f44443b6cb17266",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/e4f42d158f23b41c01938f086f44443b6cb17266",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/e4f42d158f23b41c01938f086f44443b6cb17266/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/8e919e464ecb72ec62d858734faaefc7ee0047d2"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:48:42Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:48:42Z"
  //       },
  //       "message": "updated LICENSE + README + removed INSTALL -> moved to README",
  //       "tree": {
  //         "sha": "b061f7fcf873e15ad15eaa21680fc1ed5f0d1538",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/b061f7fcf873e15ad15eaa21680fc1ed5f0d1538"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/8e919e464ecb72ec62d858734faaefc7ee0047d2",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8e919e464ecb72ec62d858734faaefc7ee0047d2/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "41d9388206de335d2625a1c50d7ab08f95b383f9",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/41d9388206de335d2625a1c50d7ab08f95b383f9",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/41d9388206de335d2625a1c50d7ab08f95b383f9"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "41d9388206de335d2625a1c50d7ab08f95b383f9",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:47:53Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-09-22T20:47:53Z"
  //       },
  //       "message": "fixed response handling for setStatus",
  //       "tree": {
  //         "sha": "a3e2ac9b514e92f91fc1e71c2eb661d0b31d2428",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/a3e2ac9b514e92f91fc1e71c2eb661d0b31d2428"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/41d9388206de335d2625a1c50d7ab08f95b383f9",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/41d9388206de335d2625a1c50d7ab08f95b383f9",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/41d9388206de335d2625a1c50d7ab08f95b383f9",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/41d9388206de335d2625a1c50d7ab08f95b383f9/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/a705e358ed4a534657ab46abcf1ffd317a8bf7a2"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //     "commit": {
  //       "author": {
  //         "name": "Chirag Shah",
  //         "email": "chiragshah1@gmail.com",
  //         "date": "2009-08-01T22:37:15Z"
  //       },
  //       "committer": {
  //         "name": "Chirag Shah",
  //         "email": "chiragshah1@gmail.com",
  //         "date": "2009-08-01T22:37:15Z"
  //       },
  //       "message": "Fix how the token secret is generated",
  //       "tree": {
  //         "sha": "6435fb51b9c3f4b326cacf27006691c9b54754b5",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/6435fb51b9c3f4b326cacf27006691c9b54754b5"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/a705e358ed4a534657ab46abcf1ffd317a8bf7a2",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/a705e358ed4a534657ab46abcf1ffd317a8bf7a2/comments",
  //     "author": {
  //       "login": "chirags",
  //       "id": 20352,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/20352?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chirags",
  //       "html_url": "https://github.com/chirags",
  //       "followers_url": "https://api.github.com/users/chirags/followers",
  //       "following_url": "https://api.github.com/users/chirags/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chirags/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chirags/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chirags/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chirags/orgs",
  //       "repos_url": "https://api.github.com/users/chirags/repos",
  //       "events_url": "https://api.github.com/users/chirags/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chirags/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "chirags",
  //       "id": 20352,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/20352?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/chirags",
  //       "html_url": "https://github.com/chirags",
  //       "followers_url": "https://api.github.com/users/chirags/followers",
  //       "following_url": "https://api.github.com/users/chirags/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/chirags/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/chirags/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/chirags/subscriptions",
  //       "organizations_url": "https://api.github.com/users/chirags/orgs",
  //       "repos_url": "https://api.github.com/users/chirags/repos",
  //       "events_url": "https://api.github.com/users/chirags/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/chirags/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-18T05:08:50Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-18T05:08:50Z"
  //       },
  //       "message": "Merge branch 'master' of git://github.com/dwhittle/yos-social-php into dwhittle/master",
  //       "tree": {
  //         "sha": "734444ce8425464c4cce230dc75c078c8ae4cf36",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/734444ce8425464c4cce230dc75c078c8ae4cf36"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/fbaae9b7744afe0e8e00a5ef62af8407ecea27ec/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e"
  //       },
  //       {
  //         "sha": "c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/c2cc55a4b8065398728e9a01c7141d20a8c06412"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-18T05:04:11Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-18T05:04:11Z"
  //       },
  //       "message": "yos-social-php: refactored oauth to match yap 1.6 + added oauth unit\ntests + yql open tables support + improved phpdoc + INSTALL",
  //       "tree": {
  //         "sha": "734444ce8425464c4cce230dc75c078c8ae4cf36",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/734444ce8425464c4cce230dc75c078c8ae4cf36"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/c2cc55a4b8065398728e9a01c7141d20a8c06412",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/c2cc55a4b8065398728e9a01c7141d20a8c06412/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "8294eb2edc2d73db64eebbf8117944d351f0788a",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8294eb2edc2d73db64eebbf8117944d351f0788a",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/8294eb2edc2d73db64eebbf8117944d351f0788a"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:56:06Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:56:06Z"
  //       },
  //       "message": "Merge branch 'master' of git://github.com/dwhittle/yos-social-php into dwhittle/master",
  //       "tree": {
  //         "sha": "61555ccb061377a437cd362fac9590840492f060",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/61555ccb061377a437cd362fac9590840492f060"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/4904ff9ae59bdbd0eef3f00a0548b0013b581c9e/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "8306ef336e3394784c9d8be6eabb3f15f958180a",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8306ef336e3394784c9d8be6eabb3f15f958180a",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/8306ef336e3394784c9d8be6eabb3f15f958180a"
  //       },
  //       {
  //         "sha": "8294eb2edc2d73db64eebbf8117944d351f0788a",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8294eb2edc2d73db64eebbf8117944d351f0788a",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/8294eb2edc2d73db64eebbf8117944d351f0788a"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "8306ef336e3394784c9d8be6eabb3f15f958180a",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:53:17Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:53:17Z"
  //       },
  //       "message": "Merge branch 'master' of git://github.com/erikeldridge/yos-social-php into erikeldridge/master",
  //       "tree": {
  //         "sha": "2673bd0460ed1190274f24a729826ab04d26d558",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/2673bd0460ed1190274f24a729826ab04d26d558"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/8306ef336e3394784c9d8be6eabb3f15f958180a",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8306ef336e3394784c9d8be6eabb3f15f958180a",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/8306ef336e3394784c9d8be6eabb3f15f958180a",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8306ef336e3394784c9d8be6eabb3f15f958180a/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "9fcede090db594f2d7bab832e27a7c118127c504",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/9fcede090db594f2d7bab832e27a7c118127c504",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/9fcede090db594f2d7bab832e27a7c118127c504"
  //       },
  //       {
  //         "sha": "ef9cafbbaa03df1f2de0dc8b5b4b18af3fa58902",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/ef9cafbbaa03df1f2de0dc8b5b4b18af3fa58902",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/ef9cafbbaa03df1f2de0dc8b5b4b18af3fa58902"
  //       }
  //     ]
  //   },
  //   {
  //     "sha": "8294eb2edc2d73db64eebbf8117944d351f0788a",
  //     "commit": {
  //       "author": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:26:34Z"
  //       },
  //       "committer": {
  //         "name": "Dustin Whittle",
  //         "email": "dustin.whittle@gmail.com",
  //         "date": "2009-07-17T22:26:34Z"
  //       },
  //       "message": "yos-social-php: fixed phpdoc for @return",
  //       "tree": {
  //         "sha": "61555ccb061377a437cd362fac9590840492f060",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/git/trees/61555ccb061377a437cd362fac9590840492f060"
  //       },
  //       "url": "https://api.github.com/repos/yahoo/yos-social-php/git/commits/8294eb2edc2d73db64eebbf8117944d351f0788a",
  //       "comment_count": 0
  //     },
  //     "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8294eb2edc2d73db64eebbf8117944d351f0788a",
  //     "html_url": "https://github.com/yahoo/yos-social-php/commit/8294eb2edc2d73db64eebbf8117944d351f0788a",
  //     "comments_url": "https://api.github.com/repos/yahoo/yos-social-php/commits/8294eb2edc2d73db64eebbf8117944d351f0788a/comments",
  //     "author": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "committer": {
  //       "login": "dustinwhittle",
  //       "id": 12161,
  //       "avatar_url": "https://avatars.githubusercontent.com/u/12161?v=3",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/dustinwhittle",
  //       "html_url": "https://github.com/dustinwhittle",
  //       "followers_url": "https://api.github.com/users/dustinwhittle/followers",
  //       "following_url": "https://api.github.com/users/dustinwhittle/following{/other_user}",
  //       "gists_url": "https://api.github.com/users/dustinwhittle/gists{/gist_id}",
  //       "starred_url": "https://api.github.com/users/dustinwhittle/starred{/owner}{/repo}",
  //       "subscriptions_url": "https://api.github.com/users/dustinwhittle/subscriptions",
  //       "organizations_url": "https://api.github.com/users/dustinwhittle/orgs",
  //       "repos_url": "https://api.github.com/users/dustinwhittle/repos",
  //       "events_url": "https://api.github.com/users/dustinwhittle/events{/privacy}",
  //       "received_events_url": "https://api.github.com/users/dustinwhittle/received_events",
  //       "type": "User",
  //       "site_admin": false
  //     },
  //     "parents": [
  //       {
  //         "sha": "4423f2599b3d703921e76a5ff5d28b01092df918",
  //         "url": "https://api.github.com/repos/yahoo/yos-social-php/commits/4423f2599b3d703921e76a5ff5d28b01092df918",
  //         "html_url": "https://github.com/yahoo/yos-social-php/commit/4423f2599b3d703921e76a5ff5d28b01092df918"
  //       }
  //     ]
  //   }
  // ];
  //


})

/*
 * Filter to perform limit to description text in Unified Dashboard
 */
.filter('serviceInfoLimit', function() {
  return function(input) {
    if(input.length > 100) {
      return input.substr(0, 100) + "<span id='filterMore'> ...</span>";
    } else {
      return input;
    }
  }

})