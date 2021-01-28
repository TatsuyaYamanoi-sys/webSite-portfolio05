$(function() {
    const main = new Main();    
});

class Main {
    constructor() {
        this._init();
    }
    _init() {
        new ClickScroll('a[href^="#"]', 400, "swing");
        new SectionParallax();
    }
    
}// class Main
class SectionParallax {
    constructor() {
        this.aboutTop = $('.section__about').offset().top;
        this.worksTop = $('.section__works').offset().top;
        this._sectionScroll();
    }
    _sectionScroll() {
        $(window).scroll(function() {
            const value = $(window).scrollTop(); //スクロールの値を取得
            $('.section__about').css('top', this.aboutTop - value);
            $('.section__works').css('top', this.worksTop - value);
        }.bind(this));
    }
}

class ClickScroll {
    constructor(els) {
        this.DOM = $(els);
        this._init();
    }
    _init(duration, easing) {
        this.DOM.click(function(){
            const sectionHref = $(this).attr("href")
            const posision = $(sectionHref).offset().top;
            const csOption = {duration: duration, easing: easing}
            if(sectionHref == "#about"){
                $("html,body").animate({scrollTop : 450}, csOption);
            }else if(sectionHref == "#works"){
                $("html,body").animate({scrollTop : 1350}, csOption);
            }else{
                $("html,body").animate({scrollTop : posision}, csOption);
            }
            return false;
        }); // コンポーネントclick-scroll.js
    }
}