#Abstract Task Definition

##Brief
We have proposed to visualize an individual's collection of archived web pages (refer to `milestone_0`).

###Ideas Discussed
1. Archive a page locally. The page is saved int it current state at the current time.
2. Don't archive a page locally. Use [WaybackMachine](https://archive.org/web/) as the archived page database.
   [More help](https://en.wikipedia.org/wiki/Help:Using_the_Wayback_Machine).
3. If WaybackMachine is used a data format of interest might be `<username>, <userid>, <liveurl>, <archiveurl>, <user tag list>`.
   Ex: `mweigle, 201602021943, http://www.odu.edu, https://web.archive.org/web/20030410204420/http://www.odu.edu/, university`
4. If pages are saved locally we'll need some simple form of serialization. Some simple alternatives include JSON,
   XML, YAML, etc.
5. Either way, we're generating an offline data set associated to a user, "mementos" in some sort of "user wallet".
6. With either method the user can schedule continuously archiving a given web page, at a specified time interval.
   Use case examples include, archiving political riots and fast paced news.
7. There is an interest in sharing the user's local dataset with others online.
   [Google Docs](https://www.google.com/docs/about/) has been suggested as a platform for sharing user collections.
8. There might be no local/offline data at all. Google Docs could be used entirely for the data model by storing pairs of
   (live link, (wayback links)) and simply generating a view for whichever data set happens to be pulled down from
   Google Docs. This could simplify data sharing greatly.
9. Other offline archiving tools discussed: [WARCreate](http://warcreate.com/), TODO (find other links).

##What?
I'm struggling defining this dataset abstractly because I feel two abstractions could represent this data set in an
equally useful manner. If we represented this data set as a table, keyed by live web page and indexing into a number of attributes including user name, archive link(s), tag(s), etc. we could facilitate navigating this data set by the currently ordered attribute.

We could also think of this data set as a tree, where nodes contain all the meta-information and nodes could be ordered
by the currently selected attribute (time stamp, ordered tag list, archive time, user name, etc.). This could facilitate navigation because we could literally navigate the actual tree links.

Regardless of which data abstraction we settle on, the more important thing to remember is that the main goal of this
visualization is being able to navigate the data set. This visualization aims to faciliate how users navigate
(their potentially massive) archived page collection.

If we took a real literal route and the user archived enough web pages we could also abstract this data set as a node
network where links are the actual links between pages. This representation might not be useful enough to faciliate
exploring the dataset. It's going to be limited if the user doesn't archive enough web pages and it might be tedious
to reorganize the data set to facilitate navigation (in comparison to other abstractions).

##Why?
Abstracting purpose for this visualization feels more straightforward than the dataset itself. The user has a potentially
large item set, which he needs to explore efficiently. The user will want to _discover_, _present_ (share), and _enjoy_ what will typically (probably most of the time) boil down to an _individual value_ ("One" "Attribute").
This _individual value_ might be a single _target_ page (TODO: probably don't want to use the word "page" if we're talking abstractly), or a collection of similar pages which have been grouped together as "one" for a reason or another (same tag, same time stamp, etc.).

The user will want to navigate the data set in all the forms described in the book: _lookup_, _browse_, _locate_, _explore_. So we'll need to build a healthy amount of filters to facilitate these operations.

```
Idea Interruption: The user could explicitly put the view into states (_lookup_, _browse_, _locate_, _explore_) which
produce different results (different views) based on the user's current intentions.
```

**Brief**: The user has a massive data set and needs to navigate it efficiently.

##Next Steps
- Explore tools and examples of interest.
  - [Mink](https://github.com/machawk1/mink)
  - [WARCreate](https://github.com/machawk1/warcreate)
  - [Wayback Machine](https://en.wikipedia.org/wiki/Help:Using_the_Wayback_Machine)
  - [PhantomJS](http://phantomjs.org/)
  - [Google Docs](https://www.google.com/docs/about/)
    - [Spreadsheet API](https://developers.google.com/google-apps/spreadsheets/)
  - [WAIL](https://github.com/machawk1/wail)
  - [ODU Research Group](http://ws-dl.blogspot.com/2012/08/2012-08-10-ms-thesis-visualizing.html)

- As a group, define and settle on a model.
  - We've got many ideas flying around. Once we pick one we can begin implementing well before
    we settle on a view, which is the actual point of interest for this class.

- Begin implementing the selected model.

- The rest is kindof followed by the milestones. The next one involves the five sheet design assignment
  in which we'll begin working out our different views. It'll be convenient to have settled on a model by
  then.

##Notes
1. [Remember random spring network idea when we talk.](http://www.visualthesaurus.com/)
2. Remember 3D tile thumbnail idea we talk.
