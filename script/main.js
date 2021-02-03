$(function() {
    const main = new Main();    
});

class Main {
    constructor() {
        this._init();
        this._fullPageScroll();
    }
    _init() {
        new ClickScroll('a[href^="#"]', 400, "swing");
        new SectionParallax();
    }
    // _observerInit() {
    //     this.observer = new ScrollObserver('section', this._fullPageScroll, {rootMargin: "-180px 0px"});
    // }
    _fullPageScroll() {
        const fps = new fullPageScroll();
        const csOption = {duration: 1, easing: "swing"}
        fps.animate(csOption);
    }
}// class Main

class fullPageScroll {
    constructor() {
        this.DOM = $('section');
        this.DOM.posTop = [];
        this._init();
    }
    _init() {
        this.DOM.each((i, e) => {
            if(i == 0) {
                this.DOM.posTop[i] = $(e).offset().top / 2;
            }else if(i == 2){
                this.DOM.posTop[i] = $(e).offset().top / 2;
            }else{
                this.DOM.posTop[i] = $(e).offset().top;
            }
        });
        console.log(this.DOM.posTop);
    }
    animate() {
        let timeoutId = 0;
        let start_pos = 0;
        $(window).scroll(function(e, csOption){
            const current_pos = $(window).scrollTop();
            if ( timeoutId ) return ;
            timeoutId = setTimeout(function() {
                timeoutId = 0 ;
                // 処理内容
                if (current_pos > start_pos) {
                    if(40 < current_pos && current_pos < 360){
                        $("html,body").animate({scrollTop : this.DOM.posTop[0]}, csOption);
                    } else if(410 < current_pos && current_pos < 750) {
                        $("html,body").animate({scrollTop : this.DOM.posTop[1]}, csOption);
                    } else if(800 < current_pos && current_pos < 1140) {
                        $("html,body").animate({scrollTop : this.DOM.posTop[2]}, csOption);
                    } else if(1190 < current_pos && current_pos < 1530) {
                        $("html,body").animate({scrollTop : this.DOM.posTop[3]}, csOption);
                    }
                    console.log('down');
                } else {
                    console.log('up');
                }
                start_pos = current_pos;
            }.bind(this), 500);
        }.bind(this))
    }
}

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
        const aboutPosision = $('#about').offset().top / 2;
        const worksPosision = $('#works').offset().top / 2;
        this.DOM.click(function(){
            const sectionHref = $(this).attr("href");
            const posision = $(sectionHref).offset().top;
            const csOption = {duration: duration, easing: easing}
            if(sectionHref == "#about"){
                $("html,body").animate({scrollTop : aboutPosision}, csOption);
            }else if(sectionHref == "#works"){
                $("html,body").animate({scrollTop : worksPosision}, csOption);
            }else{
                $("html,body").animate({scrollTop : posision}, csOption);
            }
            return false;
        }); // コンポーネントclick-scroll.js
    }
}

class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb;   // このコールバックは実際の処理
        this.options = Object.assign(defaultOptions, options);
        this.once = this.options.once;
        this._init();
    }
    _init() {
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);
                    if(this.once) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
        };  // このコールバックからはスクロール検知でtrueか、trueを一度返して抜けるか、falseを返す。
            // entryにはDOM以外の要素も含まれる為unobserveはtargetでイベント発生源を指定する。

        this.io = new IntersectionObserver(callback.bind(this), this.options);
        this.io.POLL_INTERVAL = 100;
        this.els.forEach(el => this.io.observe(el));    // .observe()で引数のDOMを監視
    }
    destroy() {
        this.io.disconnect();
    }
}