<script>
    import * as j from 'jquery';


    var entries = [ 
   
    { image: 'http://nkunited.de/ExternalImages/icons/Basket.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Lorem ipsum' },
    { image: 'http://nkunited.de/ExternalImages/icons/Briefcase.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Dolor sit amet' },
    { image: 'http://nkunited.de/ExternalImages/icons/Brush.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Consetetur sadipscing' },
    { image: 'http://nkunited.de/ExternalImages/icons/Calendar.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Sed diam' },
    { image: 'http://nkunited.de/ExternalImages/icons/Camera.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'At vero' },
    { image: 'http://nkunited.de/ExternalImages/icons/Cassette.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Nonumy eirmod' },
    { image: 'http://nkunited.de/ExternalImages/icons/Clock.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Stet clita' },
    { image: 'http://nkunited.de/ExternalImages/icons/Cloud_Download.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Justo duo' },
    { image: 'http://nkunited.de/ExternalImages/icons/Cloud_Upload.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Ut wisi enim' },
    { image: 'http://nkunited.de/ExternalImages/icons/Coffee.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Minim veniam' },
    { image: 'http://nkunited.de/ExternalImages/icons/Comments.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Quis nostrud' },
    { image: 'http://nkunited.de/ExternalImages/icons/Credit_Card.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Exerci tation' },
    { image: 'http://nkunited.de/ExternalImages/icons/Diary.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Duis autem' },
    { image: 'http://nkunited.de/ExternalImages/icons/Document.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Vel eum iriure' },
    { image: 'http://nkunited.de/ExternalImages/icons/Envelope.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Dolor in hendrerit' },
    { image: 'http://nkunited.de/ExternalImages/icons/Eraser.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'In vulputate' },
    { image: 'http://nkunited.de/ExternalImages/icons/File_Browser.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Velit esse' },
    { image: 'http://nkunited.de/ExternalImages/icons/Games.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Molestie consequat' },
    { image: 'http://nkunited.de/ExternalImages/icons/Headphones.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Vel illum' },
    { image: 'http://nkunited.de/ExternalImages/icons/Heart.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Dolore eu' },
    { image: 'http://nkunited.de/ExternalImages/icons/Home.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Feugiat nulla' },
    { image: 'http://nkunited.de/ExternalImages/icons/ID.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Facilisis at vero' },
    { image: 'http://nkunited.de/ExternalImages/icons/iPod.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Eros et accumsa' },
    { image: 'http://nkunited.de/ExternalImages/icons/Key.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Et iusto odio' },
    { image: 'http://nkunited.de/ExternalImages/icons/Location.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Dignissim qui' },
    { image: 'http://nkunited.de/ExternalImages/icons/Location_Map.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Blandit praesent' },
    { image: 'http://nkunited.de/ExternalImages/icons/Map.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Nam liber' },
    { image: 'http://nkunited.de/ExternalImages/icons/Megaphone.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Soluta nobis' },
    { image: 'http://nkunited.de/ExternalImages/icons/Message.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Magna aliquam' },
    { image: 'http://nkunited.de/ExternalImages/icons/Microphone.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Duis autem' },
    { image: 'http://nkunited.de/ExternalImages/icons/Mobile.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Lori novis' },
    { image: 'http://nkunited.de/ExternalImages/icons/Money.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Meno eqiam' },
    { image: 'http://nkunited.de/ExternalImages/icons/Padlock.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Meno equox' },
    { image: 'http://nkunited.de/ExternalImages/icons/Pencil.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Iri orem' },
    { image: 'http://nkunited.de/ExternalImages/icons/Photo.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Orel pas' },
    { image: 'http://nkunited.de/ExternalImages/icons/Polaroid.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Psi sit' },
    { image: 'http://nkunited.de/ExternalImages/icons/Printer.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Amet et quam' },
    { image: 'http://nkunited.de/ExternalImages/icons/Record.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Molare cons' },
    { image: 'http://nkunited.de/ExternalImages/icons/Save.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Digi tal' },
    { image: 'http://nkunited.de/ExternalImages/icons/Scissors.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Felenope liber' },
    { image: 'http://nkunited.de/ExternalImages/icons/Spanner.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Officia dolor' },
    { image: 'http://nkunited.de/ExternalImages/icons/Toolbox.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Autem insto' },
    { image: 'http://nkunited.de/ExternalImages/icons/Umbrella.png', width: '50', height: '50', url: 'http://jquery-plugins.net/', target: '_top', tooltip: 'Veniam isictus' }

];

var settings = {

    entries: entries,
    width: 480,
    height: 480,
    radius: '65%',
    radiusMin: 75,
    bgDraw: true,
    bgColor: '#111',
    opacityOver: 1.00,
    opacityOut: 0.05,
    opacitySpeed: 6,
    fov: 800,
    speed: 2,
    fontFamily: 'Oswald, Arial, sans-serif',
    fontSize: '15',
    fontColor: '#fff',
    fontWeight: 'normal',//bold
    fontStyle: 'normal',//italic 
    fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    fontToUpperCase: true,
    tooltipFontFamily: 'Oswald, Arial, sans-serif',
    tooltipFontSize: '11',
    tooltipFontColor: '#fff',
    tooltipFontWeight: 'normal',//bold
    tooltipFontStyle: 'normal',//italic 
    tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
    tooltipFontToUpperCase: false,
    tooltipTextAnchor: 'left',
    tooltipDiffX: 0,
    tooltipDiffY: 10

};

    j( '#tagcloud' ).svg3DTagCloud( settings );
</script>

<div id='tagcloud'></div>

<style>
    @import url(//fonts.googleapis.com/css?family=Oswald&subset=latin,latin-ext);

body {
  background-color: #000;
}
</style>