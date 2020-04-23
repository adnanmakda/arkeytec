var $mainLink = null;
var $link = null;
var $subCatItem = null;
var isTouchscreen;

jQuery(document).ready(function () {
    if ('ontouchstart' in document.documentElement) {
        isTouchscreen = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    } else {
        isTouchscreen = false;
    }

    try {
        populateFooter();
        reorderMenu();
        initBreadcrumbs();
        //initHideNavbar();
        initAnimations();
        initSolutionsSubsectionLinks();
        initCareersPage();
    } catch (e) {
        alert(e.message);
    }

    jQuery('.hamburger').on(isTouchscreen ? 'touchstart' : 'click', function (e) {
        e.preventDefault();
        hamburgerHandler();
    });

    jQuery('#menu-main-menu a[href="#"]').on(isTouchscreen ? 'touchstart' : 'click', function (e) {
        e.preventDefault();
        menuLinkHandler(jQuery(this));
    });

    jQuery('.back-arrow').on(isTouchscreen ? 'touchstart' : 'click', function (e) {
        menuBackHandler(jQuery(this));
    });

    jQuery('#menu-footer-menu > li > a:first-child').on(isTouchscreen ? 'touchstart' : 'click', function (e) {
        e.preventDefault();
    });

    jQuery('video')[0] && jQuery('video')[0].load();

});

function initCareersPage() {
    jQuery('.position a.position-title').on('click', function (e) {
        e.preventDefault();
        jQuery(this).parents('.position').toggleClass('opened');
    });
}

function hamburgerHandler() {
    if (!jQuery('body').hasClass('menu-opened')) {
        jQuery('body').addClass('menu-opened');
        setTimeout(function () {
            jQuery('.menu-main-menu-container').addClass('opened');
        }, 100);
    } else {
        jQuery('.menu-main-menu-container').removeClass('opened');
        setTimeout(function () {
            jQuery('body').removeClass('menu-opened');
        }, 100);
        setTimeout(function () {
            jQuery('#menu-main-menu a[href="#"]').parents('li').removeClass('active');
            jQuery('.sub-sub-menu').removeClass('active');
        }, 300);
    }
}

function menuLinkHandler($this) {
    jQuery('#menu-main-menu a[href="#"]').parents('li').removeClass('active');
    $this.parents('li').addClass('active');
    jQuery('.sub-sub-menu').removeClass('active');
    jQuery('.sub-sub-menu-wrap').removeClass('active');
    jQuery('.back-arrow').removeClass('disabled');
    if ($this.parents('.inner').length !== 0) {
        var id = '';
        var subSubmenuId = $this.parents('li').attr('id');
        if (subSubmenuId) {
            subSubmenuId = subSubmenuId.split('-');
            if (subSubmenuId.length === 3) {
                id = subSubmenuId[2];
            }
        }
        if (jQuery('#sub-sub-menu-' + id).length > 0) {
            jQuery('#sub-sub-menu-' + id).addClass('active');
            jQuery('#sub-sub-menu-' + id).parents('.sub-sub-menu-wrap').addClass('active');
        }
    }
}

function menuBackHandler($this) {
    if (!$this.hasClass('disabled')) {
        if (jQuery('.sub-sub-menu.active').length > 0) {
            jQuery('.sub-sub-menu').removeClass('active');
            jQuery('.sub-sub-menu-wrap').removeClass('active');
        } else {
            jQuery('.sub-menu:not(.sub-sub-menu)').parents('li').removeClass('active');
            $this.addClass('disabled');
        }
    }
}

function populateFooter() {

    jQuery('.footer-content .lists .list.pos-1 .list-title').text(jQuery('#menu-main-menu > li:first-child > a').text());
    jQuery('#menu-main-menu > li:first-child > .sub-menu > .inner > li > a').each(function () {
        jQuery('.footer-content .lists .list.pos-1').append('<a class="list-link" href="' + jQuery(this).attr('href') + '">' + jQuery(this).text() + '</a>')
    });

    jQuery('.footer-content .lists .list.pos-2 .list-title').text(jQuery('#menu-main-menu > li:nth-child(2) > a').text());
    jQuery('#menu-main-menu > li:nth-child(2) > .sub-menu .sub-menu > .inner > li > a').each(function () {
        jQuery('.footer-content .lists .list.pos-2').append('<a class="list-link" href="' + jQuery(this).attr('href') + '">' + jQuery(this).text() + '</a>')
    });

    jQuery('#menu-main-menu > li:first-child > .sub-menu > .inner > li:first-child > .sub-menu > .inner > li > a').each(function () {
        jQuery('.footer-content .lists .list.pos-3').append('<a class="list-link" href="' + jQuery(this).attr('href') + '">' + jQuery(this).text() + '</a>')
    });

}

function reorderMenu() {
    jQuery('#menu-main-menu > li .sub-menu .inner .sub-menu').each(function (index, item) {
        var subSubmenu = jQuery(item);
        var id = '';
        var liId = subSubmenu.closest('li').attr('id');
        if (liId) {
            liId = liId.split('-');
            if (liId.length === 3) {
                id = liId[2];
            }
        }
        if (subSubmenu.parents('.inner').siblings('.sub-sub-menu-wrap').length === 0) {
            var wrap = document.createElement('div');
            wrap.className = 'sub-sub-menu-wrap';
            subSubmenu.parents('.sub-menu').append(wrap);
        }
        subSubmenu.addClass('sub-sub-menu');
        subSubmenu.attr('id', 'sub-sub-menu-' + id);
        subSubmenu.appendTo(subSubmenu.parents('.sub-menu').find('.sub-sub-menu-wrap'));
    });

    jQuery('#menu-main-menu .sub-sub-menu').each(function (index, item) {
        var $self = jQuery(this);
        var first = document.createElement('div');
        first.className = 'menu-section first-section';
        $self.find('> .inner').append(first);
        var second = document.createElement('div');
        second.className = 'menu-section second-section';
        $self.find('> .inner').append(second);
        var third = document.createElement('div');
        third.className = 'menu-section third-section';
        $self.find('> .inner').append(third);
        var length = $self.find('> .inner li').length;
        if (length > 0) {
            $self.find('> .inner li').each(function (index, item) {
                if (index === 0) {
                    jQuery(item).appendTo($self.find('> .inner .first-section'));
                } else if (index <= Math.ceil(length / 2)) {
                    jQuery(item).appendTo($self.find('> .inner .second-section'));
                } else {
                    jQuery(item).appendTo($self.find('> .inner .third-section'));
                }
            });
        }
    });

    jQuery('#menu-main-menu > li > .sub-menu').each(function (index, item) {
        var $self = jQuery(this);
        var length = $self.find('> .inner li').length;
        if (length > 0) {
            var first = document.createElement('div');
            first.className = 'menu-section first-section';
            $self.find('> .inner').append(first);
            var second = document.createElement('div');
            second.className = 'menu-section second-section';
            $self.find('> .inner').append(second);
            var third = document.createElement('div');
            third.className = 'menu-section third-section';
            $self.find('> .inner').append(third);
            $self.find('> .inner li').each(function (index, item) {
                if (index === 0) {
                    jQuery(item).appendTo($self.find('> .inner .first-section'));
                } else if (index <= Math.ceil(length / 2)) {
                    jQuery(item).appendTo($self.find('> .inner .second-section'));
                } else {
                    jQuery(item).appendTo($self.find('> .inner .third-section'));
                }
            });
        }
    });
}

function initBreadcrumbs() {
    var mainTitle = '';
    if (jQuery('.projects-page').length > 0) {
        $mainLink = jQuery('#menu-main-menu > li:first-child > a');
    }
    if (jQuery('.solutions-page').length > 0) {
        $mainLink = jQuery('#menu-main-menu > li:nth-child(2) > a');
    }
    if (jQuery('.film-and-touchscreen-page').length > 0) {
        $mainLink = jQuery('#menu-main-menu > li:nth-child(2) > a');
    }
    console.log($mainLink);
    if ($mainLink) {
        mainTitle = $mainLink.text();
    }

    jQuery('.header-breadcrumb .main-title a').click(function (e) {
        e.preventDefault();
        jQuery('.hamburger').trigger(isTouchscreen ? 'touchstart' : 'click');
        if ($mainLink) {
            $mainLink.trigger(isTouchscreen ? 'touchstart' : 'click');
        }
    });

    if (jQuery('.projects-page').length > 0 || jQuery('.solutions-page').length > 0 || jQuery('.film-and-touchscreen-page').length > 0) {
        var $link = getLinkByHref(window.location.href);
        if ($link !== null) {
            var subCat = '';
            var cat = '';
            subCat = $link.text();
            var liId = $link.parents('.sub-sub-menu').attr('id');
            var id = '';
            if (liId) {
                liId = liId.split('-');
                if (liId) {
                    id = liId[liId.length - 1];
                }
            }
            if ($link.parents('.sub-sub-menu-wrap').siblings('.inner').find('#menu-item-' + id).length > 0) {
                $subCatItem = $link.parents('.sub-sub-menu-wrap').siblings('.inner').find('#menu-item-' + id);
                cat = $subCatItem.text();
            }

            if (mainTitle) {
                jQuery('.header-breadcrumb .main-title a').text(mainTitle);
            }
            if (cat) {
                jQuery('.header-breadcrumb .cat a').text(cat);
            } else {
                jQuery('.header-breadcrumb .cat').addClass("empty");
            }
            if (subCat) {
                jQuery('.header-breadcrumb .sub-cat a').text(subCat);
            }
        }

        jQuery('.header-breadcrumb .cat a').click(function (e) {
            e.preventDefault();
            jQuery('.hamburger').trigger(isTouchscreen ? 'touchstart' : 'click');
            if ($mainLink && $subCatItem) {
                $mainLink.trigger(isTouchscreen ? 'touchstart' : 'click');
                $subCatItem.find('a').trigger(isTouchscreen ? 'touchstart' : 'click');
            }
        });

        jQuery('.header-breadcrumb .sub-cat a').click(function (e) {
            e.preventDefault();
            jQuery('.hamburger').trigger(isTouchscreen ? 'touchstart' : 'click');
            if ($mainLink && $subCatItem && $link) {
                $mainLink.trigger(isTouchscreen ? 'touchstart' : 'click');
                $subCatItem.find('a').trigger(isTouchscreen ? 'touchstart' : 'click');
                $link.trigger(isTouchscreen ? 'touchstart' : 'click');
            }

        });
    }
}


function getLinkByHref(href) {
    var $link = null;
    jQuery('#menu-main-menu a').each(function () {
        var current = jQuery(this).attr('href');
        if (current === href) {
            $link = jQuery(this);
        }
    });
    return $link;
}

function initHideNavbar() {
    if (jQuery(document).scrollTop() > 0) {
        jQuery('body').removeClass('top-scrolled');
    }
    jQuery(document).on('scroll', function () {
        if (jQuery(this).scrollTop() == 0) {
            if (!jQuery('body').hasClass('top-scrolled')) {
                jQuery('body').addClass('top-scrolled');
            }
        } else if (jQuery('body').hasClass('top-scrolled')) {
            jQuery('body').removeClass('top-scrolled');
        }
    });
}

function initAnimations() {
    animateEach();
    parallaxSections();
    jQuery(document).scroll(function () {
        animateEach();
        parallaxSections();
    });
}

function parallaxSections() {
    jQuery('.section-image-wrap.parallax').each(function (index, item) {
        var scrollBottom = jQuery(window).scrollTop() + window.innerHeight;
        var perc = 100 - 100 * (scrollBottom - jQuery(item).offset().top) / (window.innerHeight + jQuery(item).height());
        jQuery(item).css('background-position-y', '' + perc + '%');
    });
}

function animateEach() {
    jQuery('.animated-section:not(.animated)').each(function (index, item) {
        if (jQuery(item).isInViewport()) {
            jQuery(item).addClass('animated');
        }
    });
}

jQuery.fn.isInViewport = function () {
    var elementTop = jQuery(this).offset().top;

    var viewportTop = jQuery(window).scrollTop();
    var viewportBottom = viewportTop + window.innerHeight;

    return elementTop < viewportBottom;
};


function findSectionByOffset() {
    if (jQuery('.animated-section:not(.animated)').length > 0) {
        var top = jQuery(document).scrollTop();
        var $ssection = null;
        var jQuerysections = jQuery('.animated-section:not(.animated)');
        for (var i = jQuerysections.length - 1; i >= 0; i--) {
            var jQuerysection = jQuery(jQuerysections.get(i));
            var elementTop = Math.round(jQuerysection.offset().top);
            if (top >= elementTop + 50) {
                $ssection = jQuerysection;
                break;
            }
        }
        return $ssection;
    }
}

function initSolutionsSubsectionLinks() {
    jQuery(".home .solution-subsection .link-wrap a[href='#']").click(function (e) {
        e.preventDefault();
    });

    jQuery(".home .solution-subsection .link-wrap a[href='#']").addClass('blank');
}