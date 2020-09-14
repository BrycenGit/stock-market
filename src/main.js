import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CarouselPage from "./carousel.js"

function makeCarousel(keys, values, entries) {
  let html = ('');
  html += `<div class="carousel-item active">`;
  html += `<div class='card search-card'><div class='card-header'>${keys[0]}</div>`;
  html += `<div class='card-body'>`;
  // html += `<div class='card-body'><img src=${img}>`;
  html += `<p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `</div></div></div>`;
  for (let i=1; i<keys.length; i++) {
    html += `<div class="carousel-item">`;

    html += `<div class='card search-card'><div class='card-header'>${keys[i]}</div>`;
    html += `<div class='card-body'>`;
    // html += `<div class='card-body'><img src=${img} >`;
    html += `<p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `</div></div></div>`;
  }
  console.log(html);
  $('.carousel-inner').html(html);
}



$(document).ready(function() {
  CarouselPage.getCarousel()
    .then(function(response) {
      
      let keys = Object.keys(response)
      let values = Object.values(response)
      let entries = Object.entries(response)
      console.log(response);
      console.log(keys);
      console.log(values);
      console.log(entries);
      console.log(values[0].quote);
      makeCarousel(keys, values, entries);

      // $("#stockCarousel").carousel();
      // $(".stockOne").click(function(){
      //   $("#stockCarousel").carousel(0);
      // });
      // $(".stockTwo").click(function(){
      //   $("#stockCarousel").carousel(1);
      // });
      // $(".stockThree").click(function(){
      //   $("#stockCarousel").carousel(2);
      // });
      // $(".stockFour").click(function(){
      //   $("#stockCarousel").carousel(3);
      // });
      // $(".stockFive").click(function(){
      //   $("#stockCarousel").carousel(4);
      // });
      // $(".stockSix").click(function(){
      //   $("#stockCarousel").carousel(5);
      // });
      // $(".stockSeven").click(function(){
      //   $("#stockCarousel").carousel(6);
      // });
      // $(".stockEight").click(function(){
      //   $("#stockCarousel").carousel(7);
      // });
      // $(".stockNine").click(function(){
      //   $("#stockCarousel").carousel(8);
      // });
      // $(".stockTen").click(function(){
      //   $("#stockCarousel").carousel(9);
      // });
      // $(".left").click(function(){
      //   $("#stockCarousel").carousel("prev");
      // });
      // $(".right").click(function(){
      //   $("#stockCarousel").carousel("next");
      // });


    });
  
});