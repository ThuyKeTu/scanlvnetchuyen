var queue = []
var queue1 = []
$.ajax({
    type: "GET",
    url: "https://www.nettruyenff.com/Comic/Services/ComicService.asmx/ProcessChapterList?comicId=17696",
    success: function(e) {
       queue = e.chapters.reverse()
        for(i=0; i<queue.length;i++){
            queue1.push(queue[i].chapterId)
        }
        console.log(JSON.stringify(queue1))
    }
})