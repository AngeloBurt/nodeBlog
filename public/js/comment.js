var prepage = 10;
var page = 1;
var pages = 0;
var comments = [];
$('#submitCommet').on('click', function () {
    const contentId = $('#contentId').val();
    const content = $('#content').val();

    if (!content) {
        alert('请输入评论');
    }

    $.ajax({
        type: 'post',
        url: '/api/comment/post',
        data: {
            contentid: contentId,
            content: content
        },
        dataType: 'json',
        success: function (result) {
            comments = result.data.comments.reverse();
            $('#content').val('');
            renderComment();
        }
    })
})

$('.pager').delegate('a', 'click', function () {

    if ($(this).parent().hasClass('previous')) {
        page--;
    } else {
        page++;
    }
    renderComment()
})
function renderComment() {

    $('#commentNum').html(comments.length);
    var $lis = $('.pager li');
    var pages = Math.max(Math.ceil(comments.length / prepage), 1);
    var start = Math.max((page - 1) * prepage, 0);
    var end = Math.min(start + prepage, comments.length);
    $lis.eq(1).html(page + '/' + pages);

    if (page <= 1) {
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if (page >= pages) {
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }
    if (comments.length == 0) {
        $('#list').html('<div class="messageBox"><p>还没有评论</p></div>')
    } else {
        var html = '';
        for (var i = start; i < end; i++) {
            html += '<li><div><span class="fl">' + comments[i].username + '</span>' +
            '<span class="fr">' + transformTime(comments[i].postTime) + '</span></div>' +
            '<div>' + comments[i].content + '</div></li>';
        }
        $('#list').html(html);
    }

}


$.ajax({
    type: 'get',
    url: 'api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    dataType: 'json',
    success: function (result) {
        comments = result.data.reverse();
        renderComment()
    }
})


function transformTime(time) {
    const d = new Date(time);
    return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
}