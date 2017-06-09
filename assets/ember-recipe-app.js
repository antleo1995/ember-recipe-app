"use strict";



define('ember-recipe-app/adapters/application', ['exports', 'ember-recipe-app/config/environment', 'active-model-adapter', 'ember'], function (exports, _emberRecipeAppConfigEnvironment, _activeModelAdapter, _ember) {
  exports['default'] = _activeModelAdapter['default'].extend({
    host: _emberRecipeAppConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),

    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ember-recipe-app/adapters/picture', ['exports', 'ember-recipe-app/adapters/application'], function (exports, _emberRecipeAppAdaptersApplication) {
  exports['default'] = _emberRecipeAppAdaptersApplication['default'].extend({
    createRecord: function createRecord(store, type, record) {
      console.log('Record is: ', record);
      var api = this.get('host');
      var serialized = this.serialize(record, { includeId: true });
      console.log('Serialized is,', serialized);
      var recipeId = serialized.recipe_id;
      var url = api + '/recipes/' + recipeId + '/pictures';
      var data = { picture: serialized };

      return this.ajax(url, 'POST', { data: data });
    }
  });
});
define('ember-recipe-app/app', ['exports', 'ember', 'ember-recipe-app/resolver', 'ember-load-initializers', 'ember-recipe-app/config/environment'], function (exports, _ember, _emberRecipeAppResolver, _emberLoadInitializers, _emberRecipeAppConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _emberRecipeAppConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _emberRecipeAppConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberRecipeAppResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _emberRecipeAppConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('ember-recipe-app/components/change-password-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    passwords: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('passwords'));
      },

      reset: function reset() {
        this.set('passwords', {});
      }
    }
  });
});
define('ember-recipe-app/components/delete-recipe', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    recipe: {},

    actions: {
      deleteRecipe: function deleteRecipe() {
        console.log('deleteRecipe button is clicked');
        return this.sendAction('deleteRecipe', this.get('recipe'));
      }
    }
  });
});
define('ember-recipe-app/components/edit-recipe', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    recipe: {},
    picture: {
      url: null
    },
    actions: {
      updateRecipe: function updateRecipe() {
        this.sendAction('updateRecipe', this.get('recipe'));
        console.log("testing updateRecipe", this.get('recipe'));
      },
      reset: function reset() {
        this.set('recipe', null);
        this.set('picture', null);
        history.back();
      },
      addPic: function addPic() {
        console.log('testing addPic');
        var data = this.get('picture');
        console.log('Data is: ', data);
        data.recipe = this.get('recipe');
        // data.set('recipe', this.get('recipe'))
        console.log('Data.recipe is: ', data.recipe);
        this.sendAction('addPic', data);
        this.set('picture.url', null);
      }
    }
  });
});
define('ember-recipe-app/components/email-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/flash-message', ['exports', 'ember-cli-flash/components/flash-message'], function (exports, _emberCliFlashComponentsFlashMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashComponentsFlashMessage['default'];
    }
  });
});
define('ember-recipe-app/components/hamburger-menu', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'button',
    classNames: ['navbar-toggle', 'collapsed'],
    attributeBindings: ['toggle:data-toggle', 'target:data-target', 'expanded:aria-expanded'],
    toggle: 'collapse',
    target: '#navigation',
    expanded: false
  });
});
define('ember-recipe-app/components/my-application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    auth: _ember['default'].inject.service(),

    user: _ember['default'].computed.alias('auth.credentials.email'),
    isAuthenticated: _ember['default'].computed.alias('auth.isAuthenticated'),

    actions: {
      signOut: function signOut() {
        this.sendAction('signOut');
      }
    }
  });
});
define('ember-recipe-app/components/navbar-header', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['navbar-header']
  });
});
define('ember-recipe-app/components/password-confirmation-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/password-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/picture-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/preptime-input', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/recipe-detail', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('ember-recipe-app/components/recipe-detail/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    actions: {
      save: function save() {
        console.log('test');
        this.sendAction('save', this.get('recipe'));
      }
    },
    showConsole: function showConsole() {
      console.log('testing show');
      this.sendAction('show', this.get('recipe'));
    }
  });
});
define('ember-recipe-app/components/recipe-detail/picture', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    actions: {
      test: function test(picture) {
        console.log(picture);
      }
    }
  });
});
define('ember-recipe-app/components/recipe-directions', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/recipe-ingredients', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/recipe-new-recipe-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    recipe: {},

    actions: {
      create: function create() {
        this.sendAction('create', this.get('recipe'));
        console.log("recipe form recipe is: ", this.get('recipe'));
      }
    }
  });
});
define('ember-recipe-app/components/recipe-title', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',
    classNames: ['form-group']
  });
});
define('ember-recipe-app/components/recipe/new-recipe', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('ember-recipe-app/components/sign-in-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('ember-recipe-app/components/sign-up-form', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: 'form',
    classNames: ['form-horizontal'],

    credentials: {},

    actions: {
      submit: function submit() {
        this.sendAction('submit', this.get('credentials'));
      },

      reset: function reset() {
        this.set('credentials', {});
      }
    }
  });
});
define('ember-recipe-app/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ember-recipe-app/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('ember-recipe-app/flash/object', ['exports', 'ember-cli-flash/flash/object'], function (exports, _emberCliFlashFlashObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashFlashObject['default'];
    }
  });
});
define('ember-recipe-app/helpers/app-version', ['exports', 'ember', 'ember-recipe-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _ember, _emberRecipeAppConfigEnvironment, _emberCliAppVersionUtilsRegexp) {
  exports.appVersion = appVersion;
  var version = _emberRecipeAppConfigEnvironment['default'].APP.version;

  function appVersion(_) {
    var hash = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (hash.hideSha) {
      return version.match(_emberCliAppVersionUtilsRegexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_emberCliAppVersionUtilsRegexp.shaRegExp)[0];
    }

    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('ember-recipe-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('ember-recipe-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define("ember-recipe-app/initializers/active-model-adapter", ["exports", "active-model-adapter", "active-model-adapter/active-model-serializer"], function (exports, _activeModelAdapter, _activeModelAdapterActiveModelSerializer) {
  exports["default"] = {
    name: 'active-model-adapter',
    initialize: function initialize() {
      var application = arguments[1] || arguments[0];
      application.register('adapter:-active-model', _activeModelAdapter["default"]);
      application.register('serializer:-active-model', _activeModelAdapterActiveModelSerializer["default"]);
    }
  };
});
define('ember-recipe-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-recipe-app/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _emberRecipeAppConfigEnvironment) {
  var _config$APP = _emberRecipeAppConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('ember-recipe-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('ember-recipe-app/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-recipe-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/index'], function (exports, _emberDataSetupContainer, _emberDataIndex) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('ember-recipe-app/initializers/export-application-global', ['exports', 'ember', 'ember-recipe-app/config/environment'], function (exports, _ember, _emberRecipeAppConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_emberRecipeAppConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _emberRecipeAppConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_emberRecipeAppConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('ember-recipe-app/initializers/flash-messages', ['exports', 'ember', 'ember-recipe-app/config/environment'], function (exports, _ember, _emberRecipeAppConfigEnvironment) {
  exports.initialize = initialize;
  var deprecate = _ember['default'].deprecate;

  var merge = _ember['default'].assign || _ember['default'].merge;
  var INJECTION_FACTORIES_DEPRECATION_MESSAGE = '[ember-cli-flash] Future versions of ember-cli-flash will no longer inject the service automatically. Instead, you should explicitly inject it into your Route, Controller or Component with `Ember.inject.service`.';
  var addonDefaults = {
    timeout: 3000,
    extendedTimeout: 0,
    priority: 100,
    sticky: false,
    showProgress: false,
    type: 'info',
    types: ['success', 'info', 'warning', 'danger', 'alert', 'secondary'],
    injectionFactories: ['route', 'controller', 'view', 'component'],
    preventDuplicates: false
  };

  function initialize() {
    var application = arguments[1] || arguments[0];

    var _ref = _emberRecipeAppConfigEnvironment['default'] || {};

    var flashMessageDefaults = _ref.flashMessageDefaults;

    var _ref2 = flashMessageDefaults || [];

    var injectionFactories = _ref2.injectionFactories;

    var options = merge(addonDefaults, flashMessageDefaults);
    var shouldShowDeprecation = !(injectionFactories && injectionFactories.length);

    application.register('config:flash-messages', options, { instantiate: false });
    application.inject('service:flash-messages', 'flashMessageDefaults', 'config:flash-messages');

    deprecate(INJECTION_FACTORIES_DEPRECATION_MESSAGE, shouldShowDeprecation, {
      id: 'ember-cli-flash.deprecate-injection-factories',
      until: '2.0.0'
    });

    options.injectionFactories.forEach(function (factory) {
      application.inject(factory, 'flashMessages', 'service:flash-messages');
    });
  }

  exports['default'] = {
    name: 'flash-messages',
    initialize: initialize
  };
});
define('ember-recipe-app/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('ember-recipe-app/initializers/local-storage-adapter', ['exports', 'ember-local-storage/initializers/local-storage-adapter'], function (exports, _emberLocalStorageInitializersLocalStorageAdapter) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter['default'];
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function get() {
      return _emberLocalStorageInitializersLocalStorageAdapter.initialize;
    }
  });
});
define('ember-recipe-app/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('ember-recipe-app/initializers/text-field', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() {
    _ember['default'].TextField.reopen({
      classNames: ['form-control']
    });
  }

  exports['default'] = {
    name: 'text-field',
    initialize: initialize
  };
});
define('ember-recipe-app/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("ember-recipe-app/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('ember-recipe-app/models/picture', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    url: _emberData['default'].attr('string'),
    recipe: _emberData['default'].belongsTo('recipe')
  });
});
define('ember-recipe-app/models/recipe', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    title: _emberData['default'].attr('string'),
    ingredient_list: _emberData['default'].attr('string'),
    directions: _emberData['default'].attr('string'),
    prep_time: _emberData['default'].attr('string'),
    editable: _emberData['default'].attr('boolean'),
    picture: _emberData['default'].belongsTo('picture')
  });
});
define('ember-recipe-app/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    email: _emberData['default'].attr('string')
  });
});
define('ember-recipe-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('ember-recipe-app/router', ['exports', 'ember', 'ember-recipe-app/config/environment'], function (exports, _ember, _emberRecipeAppConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberRecipeAppConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('recipe', { path: '/recipes/:recipe_id' }, function () {
      this.route('edit');
      this.route('picture');
    });
    this.route('recipes', function () {
      this.route('new');
    });
    this.route('recipe-edit', { path: '/recipe/:recipe_id/edit' });
    this.route('allrecipes', { path: '/allrecipes' });
  });

  exports['default'] = Router;
});
define('ember-recipe-app/routes/allrecipes', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('recipe');
    }
  });
});
define('ember-recipe-app/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signOut: function signOut() {
        var _this = this;

        this.get('auth').signOut().then(function () {
          return _this.get('store').unloadAll();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Are you sure you\'re signed-in?');
        });
      },

      error: function error(reason) {
        var unauthorized = reason.errors && reason.errors.some(function (error) {
          return error.status === '401';
        });

        if (unauthorized) {
          this.get('flashMessages').danger('You must be authenticated to access this page.');
          this.transitionTo('/sign-in');
        } else {
          this.get('flashMessages').danger('There was a problem. Please try again.');
        }

        return false;
      }
    }
  });
});
define('ember-recipe-app/routes/change-password', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      changePassword: function changePassword(passwords) {
        var _this = this;

        this.get('auth').changePassword(passwords).then(function () {
          return _this.get('auth').signOut();
        }).then(function () {
          return _this.transitionTo('sign-in');
        }).then(function () {
          _this.get('flashMessages').success('Successfully changed your password!');
        }).then(function () {
          _this.get('flashMessages').warning('You have been signed out.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ember-recipe-app/routes/recipe-edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-recipe-app/routes/recipe', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    // recipe: Ember.inject.service(),
    flashMessages: _ember['default'].inject.service(),
    // classNames: ['recipe'],
    // classNameBindings: ['listDetailHidden'],
    // listDetailHidden: false,
    model: function model(params) {
      // console.log(this.get('store').findRecord('recipe', params.recipe_id))
      return this.get('store').findRecord('recipe', params.recipe_id);
    },
    actions: {
      saveRecipe: function saveRecipe(recipe) {
        var _this = this;

        console.log('testing recipe save on recipe-edit route and recipe is: ', recipe);
        recipe.save().then(function () {
          _this.get('flashMessages').success('Changes were saved.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      reset: function reset() {
        this.transitionTo('recipe');
      },
      showConsole: function showConsole(recipe) {
        console.log(this.get('recipe'));
      },
      back: function back() {
        history.back();
      },
      savePic: function savePic(picture) {
        var _this2 = this;

        var pictureRecord = this.get('store').createRecord('picture', picture);
        pictureRecord.save().then(function () {
          _this2.get('flashMessages').success('Picture was saved.');
        })['catch'](function () {
          _this2.get('flashMessages').danger('Picture was not saved! Most likely due to existing picture');
        });
        picture = null;
      }
    }
  });
});
define('ember-recipe-app/routes/recipe/picture', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('ember-recipe-app/routes/recipes', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    recipe: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),
    classNames: ['recipe'],
    classNameBindings: ['listDetailHidden'],
    listDetailHidden: false,
    model: function model() {
      return this.get('store').findAll('recipe');
    },
    actions: {
      create: function create(recipe) {
        var _this = this;

        console.log('testing create inside recipes model and recipe is, ', recipe.title);
        var recipeRec = this.get('store').createRecord('recipe', { title: recipe.title, directions: recipe.directions, ingredient_list: recipe.ingredient_list,
          prep_time: recipe.prep_time });
        recipeRec.save().then(function () {
          _this.get('flashMessages').success('Changes were saved.');
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      },
      toggleListDetail: function toggleListDetail() {
        console.log('testing toggleListDetail');
        return this.toggleProperty('listDetailHidden');
      },
      deleteRecipe: function deleteRecipe(recipe) {
        console.log('Testing deleteRecipe in recipe.js route and recipe', recipe);
        recipe.destroyRecord();
      },
      clear: function clear(recipe) {
        console.log('testing clear');
        recipe = {};
      }
    }
  });
});
define('ember-recipe-app/routes/router', ['exports', 'ember', 'ember-recipe-app/routes/config/environment'], function (exports, _ember, _emberRecipeAppRoutesConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberRecipeAppRoutesConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('recipe', { path: '/recipes/:recipe_id' }, function () {
      this.route('edit');
    });
    this.route('recipes', function () {
      this.route('new');
    });
    this.route('recipe-edit', { path: '/recipe/:recipe_id/edit' });
    this.route('allrecipes', { path: '/allrecipes' });
  });

  exports['default'] = Router;
});
define('ember-recipe-app/routes/sign-in', ['exports', 'ember', 'rsvp'], function (exports, _ember, _rsvp) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    model: function model() {
      return _rsvp['default'].Promise.resolve({});
    },

    actions: {
      signIn: function signIn(credentials) {
        var _this = this;

        return this.get('auth').signIn(credentials).then(function () {
          return _this.transitionTo('application');
        }).then(function () {
          return _this.get('flashMessages').success('Thanks for signing in!');
        }).then(function () {
          _this.set('credentials', {});
        })['catch'](function () {
          _this.get('flashMessages').danger('There was a problem. Please try again.');
        });
      }
    }
  });
});
define('ember-recipe-app/routes/sign-up', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    auth: _ember['default'].inject.service(),
    flashMessages: _ember['default'].inject.service(),

    actions: {
      signUp: function signUp(credentials) {
        var _this = this;

        if (credentials.password !== credentials.passwordConfirmation) {
          this.get('flashMessages').danger('Passwords do not match');
        } else {
          if (!credentials.password || !credentials.passwordConfirmation) {
            this.get('flashMessages').danger('Passwords are blank');
          } else {
            this.get('auth').signUp(credentials).then(function () {
              return _this.get('auth').signIn(credentials);
            }).then(function () {
              return _this.transitionTo('application');
            }).then(function () {
              credentials = {};
            }).then(function () {
              _this.get('flashMessages').success('Successfully signed-up! You have also been signed-in.');
            })['catch'](function () {
              _this.get('flashMessages').danger('There was a problem. Please try again.');
            });
          }
        }
      }
    }
  });
});
define('ember-recipe-app/routes/users', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.get('store').findAll('user');
    }
  });
});
define('ember-recipe-app/serializers/application', ['exports', 'active-model-adapter'], function (exports, _activeModelAdapter) {
  exports['default'] = _activeModelAdapter.ActiveModelSerializer.extend({});
});
define('ember-recipe-app/services/ajax', ['exports', 'ember', 'ember-ajax/services/ajax', 'ember-recipe-app/config/environment'], function (exports, _ember, _emberAjaxServicesAjax, _emberRecipeAppConfigEnvironment) {
  exports['default'] = _emberAjaxServicesAjax['default'].extend({
    host: _emberRecipeAppConfigEnvironment['default'].apiHost,

    auth: _ember['default'].inject.service(),
    headers: _ember['default'].computed('auth.credentials.token', {
      get: function get() {
        var headers = {};
        var token = this.get('auth.credentials.token');
        if (token) {
          headers.Authorization = 'Token token=' + token;
        }

        return headers;
      }
    })
  });
});
define('ember-recipe-app/services/auth', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    signUp: function signUp(credentials) {
      return this.get('ajax').post('/sign-up', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password,
            password_confirmation: credentials.passwordConfirmation
          }
        }
      });
    },

    signIn: function signIn(credentials) {
      var _this = this;

      return this.get('ajax').post('/sign-in', {
        data: {
          credentials: {
            email: credentials.email,
            password: credentials.password
          }
        }
      }).then(function (result) {
        _this.get('credentials').set('id', result.user.id);
        _this.get('credentials').set('email', result.user.email);
        _this.get('credentials').set('token', result.user.token);
      });
    },

    changePassword: function changePassword(passwords) {
      return this.get('ajax').patch('/change-password/' + this.get('credentials.id'), {
        data: {
          passwords: {
            old: passwords.previous,
            'new': passwords.next
          }
        }
      });
    },

    signOut: function signOut() {
      var _this2 = this;

      return this.get('ajax').del('/sign-out/' + this.get('credentials.id'))['finally'](function () {
        return _this2.get('credentials').reset();
      });
    }
  });
});
define('ember-recipe-app/services/flash-messages', ['exports', 'ember-cli-flash/services/flash-messages'], function (exports, _emberCliFlashServicesFlashMessages) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFlashServicesFlashMessages['default'];
    }
  });
});
define('ember-recipe-app/services/recipe', ['exports', 'ember', 'ember-local-storage'], function (exports, _ember, _emberLocalStorage) {
  exports['default'] = _ember['default'].Service.extend({
    ajax: _ember['default'].inject.service(),
    credentials: (0, _emberLocalStorage.storageFor)('auth'),
    isAuthenticated: _ember['default'].computed.bool('credentials.token'),

    create: function create(recipe) {
      return this.get('ajax').post('/recipes', {
        data: {
          recipe: {
            title: recipe.title,
            ingredient_list: recipe.ingredients,
            directions: recipe.directions
          }
        }
      });
    }

  });
});
define('ember-recipe-app/storages/auth', ['exports', 'ember-local-storage/local/object'], function (exports, _emberLocalStorageLocalObject) {
  exports['default'] = _emberLocalStorageLocalObject['default'].extend({});
});
define("ember-recipe-app/templates/allrecipes", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "gvNJkNcE", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"underlined\"],[\"flush-element\"],[\"text\",\"All Recipes\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"    Here's where you can see recipes from all other\\n  users. Stay tuned for more features. In the future, I would like to add a\\n  rating system and a favorites system. For now, you can at least see what other\\n  chefs are up to. Feel free to drop me some suggestions on my\\n  \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/antleo1995/ember-recipe-app\"],[\"flush-element\"],[\"text\",\"github repo\"],[\"close-element\"],[\"text\",\".\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"title\"]],false],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"recipe\",[\"get\",[\"recipe\"]]],null,0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"recipe\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/allrecipes.hbs" } });
});
define("ember-recipe-app/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "A1F6Lr88", "block": "{\"statements\":[[\"append\",[\"helper\",[\"my-application\"],null,[[\"signOut\"],[\"signOut\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/application.hbs" } });
});
define("ember-recipe-app/templates/change-password", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "a7uCy8qB", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Change Password\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"change-password-form\"],null,[[\"submit\"],[\"changePassword\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/change-password.hbs" } });
});
define("ember-recipe-app/templates/components/change-password-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CvWa4lq8", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"previous\"],[\"flush-element\"],[\"text\",\"Old Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"previous\",\"Old password\",[\"get\",[\"passwords\",\"previous\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"form-group\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"next\"],[\"flush-element\"],[\"text\",\"New Password\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"class\",\"id\",\"placeholder\",\"value\"],[\"password\",\"form-control\",\"next\",\"New password\",[\"get\",[\"passwords\",\"next\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Change Password\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/change-password-form.hbs" } });
});
define("ember-recipe-app/templates/components/delete-recipe", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xFVnuLmr", "block": "{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-xs btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"deleteRecipe\"],[[\"recipe\"],[\"recipe\"]]],[\"flush-element\"],[\"text\",\"Delete\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/delete-recipe.hbs" } });
});
define("ember-recipe-app/templates/components/edit-recipe", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "1v22J9QN", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,1],[\"append\",[\"helper\",[\"input\"],null,[[\"value\",\"placehodler\"],[[\"get\",[\"recipe\",\"title\"]],\"New Title\"]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Ingredients\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-ingredients\"],null,[[\"ingredients\"],[[\"get\",[\"recipe\",\"ingredient_list\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Directions\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-directions\"],null,[[\"directions\"],[[\"get\",[\"recipe\",\"directions\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Prep Time\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"preptime-input\"],null,[[\"preptime\"],[[\"get\",[\"recipe\",\"prep_time\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"updateRecipe\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"get\",[\"recipe\",\"picture\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Picture\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"picture-input\"],null,[[\"picture\"],[[\"get\",[\"picture\",\"url\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"addPic\"]],[\"flush-element\"],[\"text\",\"Submit\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"small\",[]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"flush-element\"],[\"text\",\"Please input a URL. No second chances if you input something else...for now\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/edit-recipe.hbs" } });
});
define("ember-recipe-app/templates/components/email-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2BtbqX7P", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"email\"],[\"flush-element\"],[\"text\",\"Email\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"email\",\"email\",\"Email\",[\"get\",[\"email\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/email-input.hbs" } });
});
define("ember-recipe-app/templates/components/hamburger-menu", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "I1KEHGbe", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"sr-only\"],[\"flush-element\"],[\"text\",\"Toggle navigation\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"icon-bar\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/hamburger-menu.hbs" } });
});
define("ember-recipe-app/templates/components/my-application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "TPEd20jo", "block": "{\"statements\":[[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"navbar navbar-default\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"container-fluid\"],[\"flush-element\"],[\"text\",\"\\n    \"],[\"append\",[\"unknown\",[\"navbar-header\"]],false],[\"text\",\"\\n\\n    \"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"collapse navbar-collapse\"],[\"static-attr\",\"id\",\"navigation\"],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbarcustom nav-font\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,9],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,7],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"nav navbar-nav navbar-right\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"isAuthenticated\"]]],null,5,3],[\"text\",\"      \"],[\"close-element\"],[\"text\",\"\\n    \"],[\"close-element\"],[\"text\",\"\\n  \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"block\",[\"each\"],[[\"get\",[\"flashMessages\",\"queue\"]]],null,0],[\"text\",\"\\n\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-md-8 col-md-offset-2 greeting-content\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"flash-message\"],null,[[\"flash\"],[[\"get\",[\"flash\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"flash\"]},{\"statements\":[[\"text\",\"Sign In\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Sign Up\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-up\"],null,2],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"sign-in\"],null,1],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Change Password\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"change-password\"],null,4],[\"close-element\"],[\"text\",\"\\n        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"#\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"signOut\"]],[\"flush-element\"],[\"text\",\"Sign Out\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"All Recipes\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"allrecipes\"],null,6],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"Your Recipes\"]],\"locals\":[]},{\"statements\":[[\"text\",\"        \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"block\",[\"link-to\"],[\"recipes\"],null,8],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/my-application.hbs" } });
});
define("ember-recipe-app/templates/components/navbar-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "xYvrqj/y", "block": "{\"statements\":[[\"append\",[\"unknown\",[\"hamburger-menu\"]],false],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"application\"],[[\"class\"],[\"navbar-brand nav-font\"]],0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"Home\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/navbar-header.hbs" } });
});
define("ember-recipe-app/templates/components/password-confirmation-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "QuNou9ki", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"password-confirmation\"],[\"flush-element\"],[\"text\",\"Password Confirmation\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password-confirmation\",\"Password Confirmation\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/password-confirmation-input.hbs" } });
});
define("ember-recipe-app/templates/components/password-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "NoQgDalo", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"kind\"],[\"flush-element\"],[\"text\",\"Password\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"password\",\"password\",\"Password\",[\"get\",[\"password\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/password-input.hbs" } });
});
define("ember-recipe-app/templates/components/picture-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kZ1o0ljn", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"picture\",\"picture\",\"Image URL\",[\"get\",[\"picture\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/picture-input.hbs" } });
});
define("ember-recipe-app/templates/components/preptime-input", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "eeCl+EiB", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"preptime\",\"preptime\",\"Prep time\",[\"get\",[\"preptime\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/preptime-input.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-detail", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "22h6xyMD", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"recipe-list\"],[\"static-attr\",\"width\",\"100%\"],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"underlined\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"recipe\",\"picture\"]]],null,1],[\"text\",\"  \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Ingredients:\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"ingredient_list\"]],false],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Directions:\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"directions\"]],false],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"recipe\",\"prep_time\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"h3\",[]],[\"flush-element\"],[\"text\",\"Prep Time: \"],[\"append\",[\"unknown\",[\"recipe\",\"prep_time\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"  \"],[\"append\",[\"helper\",[\"recipe-detail/picture\"],null,[[\"picture\"],[[\"get\",[\"recipe\",\"picture\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-detail.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-detail/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "2o0Wo5Ad", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"test\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-detail/edit.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-detail/picture", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wrYSueRY", "block": "{\"statements\":[[\"open-element\",\"img\",[]],[\"static-attr\",\"height\",\"150\"],[\"static-attr\",\"width\",\"150\"],[\"dynamic-attr\",\"src\",[\"concat\",[[\"unknown\",[\"picture\",\"url\"]]]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-detail/picture.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-directions", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "c7r2LPgi", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"recipe\",\"directions\",\"Directions\",[\"get\",[\"directions\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-directions.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-ingredients", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3UA/lM5d", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"recipe\",\"ingredients\",\"Ingredients\",[\"get\",[\"ingredients\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-ingredients.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-list", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FZzoSwu5", "block": "{\"statements\":[[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"div\",[]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"toggleListDetail\"]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"recipe-detail\"],null,[[\"recipe\"],[[\"get\",[\"recipe\"]]]]],false],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"delete-recipe\"],null,[[\"deleteRecipe\",\"recipe\"],[\"deleteRecipe\",[\"get\",[\"recipe\"]]]]],false],[\"text\",\"\\n    \"],[\"block\",[\"link-to\"],[\"recipe-edit\"],[[\"recipe\"],[[\"get\",[\"recipe\"]]]],0],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"flush-element\"],[\"text\",\"Edit\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-list.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-new-recipe-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "Lsh7e1da", "block": "{\"statements\":[[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Title\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-title\"],null,[[\"title\"],[[\"get\",[\"recipe\",\"title\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Ingredients\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-ingredients\"],null,[[\"ingredients\"],[[\"get\",[\"recipe\",\"ingredient_list\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Directions\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-directions\"],null,[[\"directions\"],[[\"get\",[\"recipe\",\"directions\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"label\",[]],[\"static-attr\",\"for\",\"recipe\"],[\"flush-element\"],[\"text\",\"Prep time\"],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"preptime-input\"],null,[[\"preptime\"],[[\"get\",[\"recipe\",\"prep_time\"]]]]],false],[\"text\",\"\\n\"],[\"open-element\",\"small\",[]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"flush-element\"],[\"text\",\"Prep time is an optional input\"],[\"close-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"recipes.new\"],null,1],[\"text\",\"\\n\"],[\"block\",[\"link-to\"],[\"recipes\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-default\"],[\"flush-element\"],[\"text\",\"Cancel\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-md btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"create\"]],[\"flush-element\"],[\"text\",\"Create\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-new-recipe-form.hbs" } });
});
define("ember-recipe-app/templates/components/recipe-title", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "o8KWcnHk", "block": "{\"statements\":[[\"append\",[\"helper\",[\"input\"],null,[[\"type\",\"id\",\"placeholder\",\"value\"],[\"recipe\",\"title\",\"Title\",[\"get\",[\"title\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/recipe-title.hbs" } });
});
define('ember-recipe-app/templates/components/router', ['exports', 'ember', 'ember-recipe-app/templates/components/config/environment'], function (exports, _ember, _emberRecipeAppTemplatesComponentsConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _emberRecipeAppTemplatesComponentsConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('sign-up');
    this.route('sign-in');
    this.route('change-password');
    this.route('users');
    this.route('recipe', { path: '/recipes/:recipe_id' }, function () {
      this.route('edit');
    });
    this.route('recipes', function () {
      this.route('new');
    });
    this.route('recipe-edit', { path: '/recipe/:recipe_id/edit' });
    this.route('allrecipes', { path: '/allrecipes' });
  });

  exports['default'] = Router;
});
define("ember-recipe-app/templates/components/sign-in-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "14NPMsWa", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign In\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/sign-in-form.hbs" } });
});
define("ember-recipe-app/templates/components/sign-up-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "69w7kw3r", "block": "{\"statements\":[[\"append\",[\"helper\",[\"email-input\"],null,[[\"email\"],[[\"get\",[\"credentials\",\"email\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"password\"]]]]],false],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"password-confirmation-input\"],null,[[\"password\"],[[\"get\",[\"credentials\",\"passwordConfirmation\"]]]]],false],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"type\",\"submit\"],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"submit\"]],[\"flush-element\"],[\"text\",\"\\n  Sign Up\\n\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"reset\"]],[\"flush-element\"],[\"text\",\"\\n  Cancel\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/components/sign-up-form.hbs" } });
});
define("ember-recipe-app/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "pPIvp+4f", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"id\",\"greeting-content\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"open-element\",\"img\",[]],[\"static-attr\",\"class\",\"recipe-image clearfix\"],[\"static-attr\",\"height\",\"225px\"],[\"static-attr\",\"width\",\"175px\"],[\"static-attr\",\"src\",\"https://i.imgur.com/AeUL1Cb.jpg\"],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"\\n      \"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Woohoo! Final project baby!\"],[\"close-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n       \"],[\"open-element\",\"small\",[]],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"flush-element\"],[\"text\",\"This project was done in ember. It's a conversion of project 2 - looks familiar, no?\"],[\"close-element\"],[\"close-element\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n     Converting the previous project to an ember app was quite challenging. In addtion to converting to ember, I have added an additional feature to upload a custom image for your recipe. This picture is propogated to a new table and pulled in dynamically. Also can now see recipes from all users instead of just your own.\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n     This site is purely ember, no extra bells and whistle, but it employs a lot of ember trickes to function. The backend remains the same as before with additions to accomodate the new features - \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.heroku.com\"],[\"flush-element\"],[\"text\",\"Heroku\"],[\"close-element\"],[\"text\",\". \"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n     For those interested you can follow this \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"https://github.com/antleo1995/ember-recipe-app\"],[\"flush-element\"],[\"text\",\"link\"],[\"close-element\"],[\"text\",\" to my \"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"http://www.github.com\"],[\"flush-element\"],[\"text\",\"github\"],[\"close-element\"],[\"text\",\" repository for a closer look at the nuts and bolts of it all. And as before,\\n     feel free to edit and update and send me a pull request. Always happy to colloborate as I still have plenty to learn.\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n     In future iterations I would like to include the ability to see recipes from other users, but for now, there are deadlines to meet. I hope you all enjoy.\\n   \"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/index.hbs" } });
});
define("ember-recipe-app/templates/recipe-edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "kLPIFcLq", "block": "{\"statements\":[[\"append\",[\"helper\",[\"recipe-detail/edit\"],null,[[\"recipe\",\"updateRecipe\"],[[\"get\",[\"model\"]],\"save\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipe-edit.hbs" } });
});
define("ember-recipe-app/templates/recipe", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "nNefm8pW", "block": "{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"div\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"title\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"helper\",[\"recipe-detail\"],null,[[\"updateRecipe\",\"reset\",\"recipe\",\"showConsole\"],[\"save\",\"reset\",[\"get\",[\"model\"]],\"showConsole\"]]],false],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipe.hbs" } });
});
define("ember-recipe-app/templates/recipe/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "zPJxz/G6", "block": "{\"statements\":[[\"append\",[\"helper\",[\"edit-recipe\"],null,[[\"recipe\",\"updateRecipe\",\"reset\",\"addPic\"],[[\"get\",[\"model\"]],\"saveRecipe\",\"reset\",\"savePic\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipe/edit.hbs" } });
});
define("ember-recipe-app/templates/recipe/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "EvngnbUN", "block": "{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"model\",\"editable\"]]],null,1],[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"modifier\",[\"action\"],[[\"get\",[null]],\"back\"]],[\"flush-element\"],[\"text\",\"Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-primary\"],[\"flush-element\"],[\"text\",\"Edit\"],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"link-to\"],[\"recipe.edit\"],null,0],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipe/index.hbs" } });
});
define("ember-recipe-app/templates/recipe/picture", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UT9YpCk6", "block": "{\"statements\":[[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"test\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipe/picture.hbs" } });
});
define("ember-recipe-app/templates/recipes", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "ghHc//fV", "block": "{\"statements\":[[\"open-element\",\"h1\",[]],[\"static-attr\",\"class\",\"underlined\"],[\"flush-element\"],[\"text\",\"Your Recipes\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"p\",[]],[\"flush-element\"],[\"text\",\"    Here's where you can create a new recipe or see your\\n  recipes you've created. Click the link and it will bring you to a detail view.\\n  There you can edit your recipe's text or add a photo if you want one. If you\\n  want to delete a recipe then the delete button below the recipe is probably a\\n  good chooice. Be warned, once you upload a photo, it's final, so choose wisely.\\n\"],[\"close-element\"],[\"text\",\"\\n  \"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,2],[\"close-element\"],[\"text\",\"\\n\"],[\"append\",[\"unknown\",[\"outlet\"]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"div\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"recipe\",\"title\"]],false],[\"close-element\"]],\"locals\":[]},{\"statements\":[[\"open-element\",\"li\",[]],[\"flush-element\"],[\"text\",\"\\n  \"],[\"block\",[\"link-to\"],[\"recipe\",[\"get\",[\"recipe\"]]],null,0],[\"text\",\"\\n    \"],[\"append\",[\"helper\",[\"delete-recipe\"],null,[[\"deleteRecipe\",\"recipe\"],[\"deleteRecipe\",[\"get\",[\"recipe\"]]]]],false],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"recipe\",\"editable\"]]],null,1]],\"locals\":[\"recipe\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipes.hbs" } });
});
define("ember-recipe-app/templates/recipes/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "oqsgRaOO", "block": "{\"statements\":[[\"block\",[\"link-to\"],[\"recipes.new\"],null,0],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"open-element\",\"button\",[]],[\"static-attr\",\"class\",\"btn btn-default\"],[\"flush-element\"],[\"text\",\"Create\"],[\"close-element\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipes/index.hbs" } });
});
define("ember-recipe-app/templates/recipes/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "JqZdCHKJ", "block": "{\"statements\":[[\"append\",[\"helper\",[\"recipe-new-recipe-form\"],null,[[\"recipe\",\"create\"],[[\"get\",[\"model\"]],\"create\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/recipes/new.hbs" } });
});
define("ember-recipe-app/templates/sign-in", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "UcUF+vRd", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign In\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-in-form\"],null,[[\"submit\",\"reset\",\"credentials\"],[\"signIn\",\"reset\",[\"get\",[\"model\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/sign-in.hbs" } });
});
define("ember-recipe-app/templates/sign-up", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "CfrIvez/", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Sign Up\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"append\",[\"helper\",[\"sign-up-form\"],null,[[\"submit\",\"reset\"],[\"signUp\",\"reset\"]]],false],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/sign-up.hbs" } });
});
define("ember-recipe-app/templates/users", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "3eVEPhbs", "block": "{\"statements\":[[\"open-element\",\"h2\",[]],[\"flush-element\"],[\"text\",\"Users\"],[\"close-element\"],[\"text\",\"\\n\\n\"],[\"open-element\",\"ul\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"model\"]]],null,0],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"  \"],[\"open-element\",\"li\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"user\",\"email\"]],false],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"user\"]}],\"hasPartials\":false}", "meta": { "moduleName": "ember-recipe-app/templates/users.hbs" } });
});


define('ember-recipe-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-recipe-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("ember-recipe-app/app")["default"].create({"name":"ember-recipe-app","version":"0.0.0+ab393b86"});
}
//# sourceMappingURL=ember-recipe-app.map