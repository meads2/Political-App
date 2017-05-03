var App = {
  init: function(){
    App.config = {
      api_url: 'https://cors-anywhere.herokuapp.com/' + 'https://congress.api.sunlightfoundation.com/legislators/locate?zip='
    }
    // Setup App
    this.domCache();
    this.eventBinder();
  },
  domCache: function(){
    this.$el = $('#navbar');
    this.$input = this.$el.find('input');
    this.$btn = this.$el.find('a');
    this.$reps = $('#reps');
    this.template = $('#rep-template').html();
    this.$errMsg = $('.error');
  },
  eventBinder: function(){
    this.$btn.click(this.getData.bind(this));
    $(document).keydown(function(e){
      var key = e.keyCode;
      var ENT_KEY_CODE = 13;
      if(key == ENT_KEY_CODE){
        App.getData();
      }
    })
  },
  isZip: function(zip){
   return /^\d{5}(-\d{4})?$/.test(zip);
  },
  getData: function(){
    this.$reps.empty();
    var zip = this.$input.val();
    var query = this.config.api_url + zip;
    // Enter The IF Statement
    if(this.isZip(zip)){
      this.$errMsg.hide();
      console.log('Is Zip...');
          $.getJSON(query, function(data){
      $.each(data.results, function(k, v){
        //console.log(data.results[k]);
        var fname = data.results[k].first_name;
        var lname = data.results[k].last_name;
        var party = data.results[k].party;
        var fbUrl = 'https://www.facebook.com/';
        var fbId = data.results[k].facebook_id;
        var twitterHandle = data.results[k].twitter_id;
        // Create Elements
        var li = $('<li>');
        var pInd = $('<span>');

        // Create Social
        var social = $('<div>');
        social.addClass('social');

        // Create Facebook
        var facebook = $('<a/>');
        facebook.addClass('ion-social-facebook fb');
        facebook.attr('href', fbUrl + fbId);
        social.append(facebook);

        // Create Twitter
        var twitter = $('<a/>');
        twitter.addClass('ion-social-twitter twitter');
        twitter.attr('href', 'http://www.twitter.com/' + twitterHandle);
        social.append(twitter);

        // Add Class Based On Party
        if(party == 'R'){
          pInd.addClass('r');
        }else{
          pInd.addClass('b');
        }
        li.text(fname + ' ' + lname);
        li.addClass('rep');
        li.append(pInd);
        li.append(social);
        App.$reps.append(li);
        App.$input.val('');
      });
    });
    }else{
      console.log('Not A Zip...');
      this.$errMsg.show();
    }

  }
};

App.init();
