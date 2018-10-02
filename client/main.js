import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';


 Languages = new Mongo.Collection('Languages');

var editvalue;

 
if (Meteor.isClient) {
var targetid;
  Template.posts.helpers({  	
    Languages: function() {
      return Languages.find();
    }
  })

  Template.post.helpers({    
    editing: function() {
      return Session.get("target" + targetid);
    }
  })





  Template.postForm.events({
  	 'submit form': function(event) {
         event.preventDefault();
         var textValue = event.target.content.value;
        

         Languages.insert({name: textValue});
         event.target.content.value = "";
      }
  })

Template.post.events({
    'click #delete':function(event){
   
      Languages.remove(event.target.value);
    },
   'click #edit':function(event){
    
    
     targetid = event.target.textContent;
      console.log(targetid);
     Session.set("target" + targetid,true);
   


      Template.post.editing = Session.get("target" + targetid);
    } ,  

    'keypress input':function(event){
   
      if (event.keyCode == 13){
      
       var post = Languages.find(targetid);
       
        var updatedData = event.target.value;
         Languages.update(targetid, {
      $set: { name: updatedData }
    });
        Session.set("target" + targetid,false);
      }
    }


  })



}

