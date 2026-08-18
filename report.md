# PulseJS — Project Report


## 1. Overview


**PulseJS** is a lightweight, zero-dependency frontend framework built from scratch using **Vanilla JavaScript (ES6+)**.


The goal was to understand how modern frameworks like React/Vue handle **reactivity, rendering, components, scheduling, and routing** internally instead of simply using them.


---


## 2. Objectives


- Build a reactive state system using `Proxy` and `Reflect`
- Implement automatic dependency tracking
- Create effects and update scheduling
- Build a lightweight Virtual DOM
- Implement DOM rendering and patching
- Create a component and lifecycle system
- Implement a custom Event Bus
- Build a zero-dependency SPA Router
- Create a reusable `createApp()` API
- Build a real-time dashboard using PulseJS


---


## 3. Tech Stack


- **JavaScript ES6+**
- HTML5
- CSS3
- Browser DOM API
- History API
- **Zero external dependencies**


---


## 4. Project Structure


```text
pulseJS/
│
├── core/
│   ├── reactive.js
│   ├── effect.js
│   ├── dependency.js
│   ├── scheduler.js
│   ├── vdom.js
│   ├── component.js
│   ├── eventBus.js
│   ├── router.js
│   └── app.js
│
├── demo/
│   ├── dashboard.js
│   ├── analytics.js
│   └── router.js
│
├── index.html
├── main.js
└── REPORT.md
5. Core Features
Reactive State

Implemented reactive objects using Proxy + Reflect.

state change
     ↓
Proxy
     ↓
trigger()
     ↓
effect()
     ↓
UI update
Dependency Tracking

Used:

WeakMap
Map
Set

to connect reactive properties with the effects that depend on them.

Implemented:

track()
trigger()
activeEffect
Effects & Scheduler

effect() automatically re-runs when its dependencies change.

A scheduler batches updates to reduce unnecessary rendering.

Multiple state changes
        ↓
    Scheduler
        ↓
   Single update
Virtual DOM

Implemented:

h()
VNodes
createElement()
render()
patch()

The framework compares old and new VNodes and updates the required DOM.

Component System

Created a reusable Component class with:

mount()
update()
unmount()

Lifecycle hooks:

onMount()
onUpdate()
onUnmount()
Event Bus

Implemented Publish/Subscribe communication:

on()
off()
emit()
SPA Router

Built a client-side router using the native History API.

Supports:

/
/analytics
/user/:id

with dynamic route parameters and browser back/forward navigation.

Application API

Implemented:

const app = createApp(router);
app.mount("#app");

to provide a simple framework-style entry point.

6. Demo Application

A real-time System Performance Dashboard was built using PulseJS.

It demonstrates:

CPU usage
Memory usage
Request count
Reactive updates
Component lifecycle
SPA navigation
Analytics page

The dashboard updates automatically using PulseJS reactive state.

7. Complete Architecture
Reactive State
      ↓
Proxy / Reflect
      ↓
track() / trigger()
      ↓
Effect + Scheduler
      ↓
Component
      ↓
render()
      ↓
Virtual DOM
      ↓
patch()
      ↓
Real DOM

Routing:

User Action
    ↓
Router
    ↓
History API
    ↓
Route Matching
    ↓
Unmount Old Component
    ↓
Mount New Component
8. Key Concepts Learned
Proxy & Reflect
Closures & scope
Map / Set / WeakMap
Dependency tracking
Reactive programming
Observer / Publish-Subscribe patterns
Async scheduling
Virtual DOM
DOM manipulation
Component architecture
Lifecycle management
SPA routing
History API
ES Modules
Resource cleanup


JavaScript Basics

Proxy — Intercepts object operations like reading and changing properties.

Reflect — Performs the original object operation safely inside Proxy traps.

Map — Stores key-value relationships; useful for dependency maps.

Set — Stores unique values; useful for storing effects without duplicates.

WeakMap — Stores object-based keys without preventing garbage collection; useful for reactive dependency storage.

ES Modules — import/export lets us split PulseJS into separate reusable files.

Reactivity

Reactive State — Makes normal objects automatically respond when their values change.

const state = reactive({ count: 0 });

reactive() — Wraps an object in a Proxy so PulseJS can detect reads and writes.

effect() — Runs a function and automatically re-runs it when the reactive data it uses changes.

activeEffect — Keeps track of which effect is currently running so dependencies can be recorded.

track() — Called when reactive data is read; records which effect depends on that property.

trigger() — Called when reactive data is changed; finds and runs/schedules dependent effects.

Reactivity Flow
Read → track()
Change → trigger()
        ↓
      effect()
        ↓
      render
Scheduler

Scheduler — Controls when effects execute instead of immediately running them every time state changes.

Batching — Multiple changes can be grouped into one update, reducing unnecessary rendering.

count = 1
count = 2
count = 3
     ↓
  Scheduler
     ↓
One update
Virtual DOM

Virtual DOM (VDOM) — A JavaScript representation of the UI instead of directly manipulating the DOM every time.

h() — Creates a Virtual DOM node.

h("h1", {}, ["Hello"]);

VNode — Plain JavaScript object describing an element, its properties, and children.

createElement() — Converts a VNode into a real DOM element.

render() — Places the generated DOM element into a container.

patch() — Compares old and new VNodes and updates the changed DOM instead of rebuilding everything.

VDOM Flow
State Change
    ↓
New VNode
    ↓
Compare
    ↓
Patch
    ↓
DOM Update
Components

Component — Reusable UI unit containing its own state and rendering logic.

mount() — Adds a component to the DOM and starts its lifecycle.

update() — Re-renders the component when its state changes.

unmount() — Removes the component and performs cleanup.

onMount() — Runs after the component is added to the page.

onUpdate() — Runs after the component updates.

onUnmount() — Runs when the component is removed; useful for cleanup.

Event Bus

Event Bus — Allows different parts of the application to communicate without directly depending on each other.

on() — Subscribe/listen to an event.

emit() — Send/fire an event.

off() — Remove an event listener.

Component A
    ↓ emit
 Event Bus
    ↓ on
Component B
SPA Router

SPA Router — Changes pages/views without completely reloading the browser.

navigate() — Changes the current route programmatically.

history.pushState() — Changes the URL without reloading the page.

popstate — Detects browser Back/Forward navigation.

Route Matching — Finds which component should be displayed for the current URL.

Dynamic Route — Allows variable URL parts such as:

/user/:id

which can match:

/user/123
createApp()

createApp() — Provides a simple entry point for starting the framework.

const app = createApp(router);
app.mount("#app");

It hides framework initialization details from the application developer.

Resource Cleanup

Cleanup — Stops timers, listeners, subscriptions, etc. when a component is removed.

onUnmount() {
    clearInterval(this.timer);
}

Without cleanup, background processes may continue running after the UI is gone.

⭐ Complete PulseJS Mental Model
Reactive State
      ↓
Proxy / Reflect
      ↓
track() / trigger()
      ↓
Effects
      ↓
Scheduler
      ↓
Component
      ↓
Virtual DOM
      ↓
patch()
      ↓
Real DOM

And for navigation:

User Click
    ↓
Router
    ↓
History API
    ↓
Route Match
    ↓
Unmount Old Component
    ↓
Mount New Component

One-line definition:

PulseJS is a mini frontend framework built from scratch to understand how reactivity, rendering, components, scheduling, and SPA routing work internally