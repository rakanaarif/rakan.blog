// AUTO READ MORE
function stripTags(s, n) {
    return s.replace(/<.*?>/ig, '').split(/\s+/).slice(0, n - 1).join(' ');
}
function readmore(id) {
var summ = 42 ;
var p = document.getElementById(id);
    imgtag = "";
    ifrtag = "";
    img = p.getElementsByTagName("img");
    ifr = p.getElementsByTagName("iframe");
    
		 if (ifr.length >= 1) ifrtag = '<div class="blog-content-wrapper" ><div class="gdlr-blog-thumbnail gdlr-video"><iframe width="685px" height="380px" src="' + ifr[0].src + '" frameborder="0" allowfullscreen style="display:block;"></iframe></div>';

    else if (img.length >= 1) imgtag = '<div class="blog-content-wrapper" ><div class="gdlr-blog-thumbnail"><a href="' + post_url + '"> <img src="' + img[0].src + '" width="685px" height="400px" /></a></div>';

    else imgtag = '<div class="blog-content-wrapper" >';

    p.innerHTML = '<div class="blog-content-inner-wrapper"><header class="post-header"><h3 class="gdlr-blog-title"><a href="' + post_url + '">' + post_title + '</a></h3><div class="gdlr-blog-info gdlr-title-font gdlr-info"><div class="blog-info blog-tag"><i class="fa fa-tags"></i> ' + label + '</div><div class="blog-info blog-author"><i class="fa fa-user"></i><a href="' + author_url + '" title="Posts by ' + author_name + '" rel="author">' + author_name + '</a></div><span class="gdlr-seperator"></span><div class="blog-info blog-comments"><i class="fa fa-comments"></i><a href="' + post_url + '" >' + comment + ' </a></div><div class="clear"></div></div></header>' + ifrtag + imgtag + '<div class="gdlr-blog-content"><p>' + stripTags(p.innerHTML,summ) + '</p><p> <a href="' + post_url + '" class="more-link"><span class="gdlr-button with-border excerpt-read-more">تابع القراءة »</span></a></p><div class="gdlr-social-share"><a href="http://digg.com/submit?url=' + post_url +'&#038;title=' + post_title +'" target="_blank"><img src="http://1.bp.blogspot.com/--X0PqMYO_EM/VRRFAsJkJOI/AAAAAAAAEm0/4Y_o6bvmWBw/s1600/digg.png" alt="digg-share" width="112" height="112" /></a><a href="http://www.facebook.com/share.php?u=' + post_url +'" target="_blank"><img src="http://1.bp.blogspot.com/-7KLr93ewAZI/VRRFA4fBavI/AAAAAAAAEm4/xyWY01jONOk/s1600/facebook.png" alt="facebook-share" width="112" height="112" /></a><a href="http://www.linkedin.com/shareArticle?mini=true&#038;url=' + post_url +'&#038;title=' + post_title +'" target="_blank"><img src="http://2.bp.blogspot.com/-bH0Fo6twhUM/VRRFAynQHLI/AAAAAAAAEm8/2smVRJ2YWw4/s1600/linkedin.png" alt="linked-share" width="112" height="112" /></a><a href="http://www.tumblr.com/share/link?url=' + post_url +'&amp;name=' + post_title +'" target="_blank"><img src="http://4.bp.blogspot.com/-LoH6JEkemKY/VRRFCX_KSII/AAAAAAAAEnQ/47EbsgvSy1A/s1600/tumblr.png" alt="tumblr-share" width="112" height="112" /></a><a href="http://reddit.com/submit?url=' + post_url +'&#038;title=' + post_title +'" target="_blank"><img src="http://2.bp.blogspot.com/-cGmcrYzUPZ0/VRRFB-My7fI/AAAAAAAAEnM/2zjv1rJl1qA/s1600/reddit.png" alt="reddit-share" width="112" height="112" /></a><a href="http://www.stumbleupon.com/submit?url=' + post_url +'&#038;title=' + post_title +'" target="_blank"><img src="http://1.bp.blogspot.com/-ltXXUIhkN1E/VRRFCSd3uiI/AAAAAAAAEnU/80VQeI6jmt0/s1600/stumble-upon.png" alt="stumble-upon-share" width="112" height="112" /></a><a href="http://twitter.com/home?status=' + post_title +'-' + post_url +'" target="_blank"><img src="http://4.bp.blogspot.com/-rJbzl3FAQMk/VRRFEQf0-0I/AAAAAAAAEnk/RlJNbnbh2Dw/s1600/twitter.png" alt="twitter-share" width="112" height="112" /></a><div class="clear"></div></div></div></div> </div>';
}
