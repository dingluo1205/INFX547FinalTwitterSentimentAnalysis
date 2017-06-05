'use strict';  //treat silly mistakes as run-time errors

//SENTIMENTS, EMOTIONS, and SAMPLE_TWEETS have already been "imported"

/* Your script goes here */
// console.log(EMOTIONS)
// console.log(SENTIMENTS)
// console.log(SAMPLE_TWEETS)

function split_texts(text){
	var words = text.split(/\W+/)
	words = words.map(function(w){return w.toLowerCase()}).filter(function(w){
		if(w.length > 1){
			return w;
		}
	})
	return words
}

// var words = split_texts('how are you?abacus i like i i like like like positive abba Eating abba')
// console.log(words)

function wordsContainEmotion(words, emotion){
	words = words.filter(function(w){
		if(w in SENTIMENTS && emotion in SENTIMENTS[w]){
			return w;
		}
	})

	return words
}

// var re = wordsContainEmotion(words,'positive')
// console.log(re)

function emotionDict(words){
	var result = {}
	for(var i of Object.keys(EMOTIONS)){
		result[EMOTIONS[i]] = wordsContainEmotion(words, EMOTIONS[i])
	}
	return result
}

// var dict = emotionDict(words)
// console.log(dict)

function mostCommonWords(words){
	var temp = {}
	for(var i in words){
		if(words[i] in temp){
			temp[words[i]]++;
		} else {
			temp[words[i]] = 1
		}
	}
	var result = []
	for(var j of Object.keys(temp)){
		result.push([j,temp[j]])
	}
	result = result.sort(function(a,b){return b[1]-a[1]})
	return result
}

// var common = mostCommonWords(words)
// console.log(common)

function analyzeTweets(tweets){

	tweets.map(function(t){
		t['words'] = split_texts(t.text)
		t['emotions'] = emotionDict(split_texts(t.text))
		if(t['entities']['hashtags'][0] != undefined){
			t['hashtags']=[]
			for(var i in t['entities']['hashtags']){
				t['hashtags'] = t['hashtags'].concat(t['entities']['hashtags'][i].text)
			}
		} else {
			t['hashtags'] = []
		}
		return t
	})

	var hash_emotion = {}
	for(var i of Object.keys(EMOTIONS)){
		hash_emotion[EMOTIONS[i]] = []
		for(var j in tweets){
			if(tweets[j].emotions[EMOTIONS[i]] != 0){
				hash_emotion[EMOTIONS[i]] = hash_emotion[EMOTIONS[i]].concat(tweets[j].hashtags)
			}
		}
	}


	var words_list = tweets.reduce(function(result, t){
		result = result.concat(t.words)
		return result
	},[])


	var r = emotionDict(words_list)

	for(var i of Object.keys(r)){
		r[i] = [r[i].length/words_list.length].concat([r[i]])
		r[i][1] = mostCommonWords(r[i][1]).slice(0,3).map(function(d){return ' '+d[0]})
	}

	for(var i of Object.keys(r)){
		r[i] = r[i].concat([hash_emotion[i]])
	}

	var result = []
	for(var i of Object.keys(r)){
		result.push([i,r[i]])
	}

	result = result.sort(function(a,b){return b[1][0]-a[1][0]})

	result.forEach(function(d){
		d[1][0] = (d[1][0]*100).toFixed(2)+'%'
		d[1][2] = mostCommonWords(d[1][2]).slice(0,3).map(function(d){return ' #'+d[0]})
	})
	return result
}

// console.log(analyzeTweets((SAMPLE_TWEETS)))

function showEmotionData(tweets){
	
	var to_visualize = analyzeTweets(tweets) 
	var tableBody = d3.select('#emotionsTable')
	for(var i of Object.keys(to_visualize)){
		var tr = tableBody.append('tr')
		for(var j=0;j<4;j++){
			if(j == 0){
				tr.append('td').text(to_visualize[i][0])
			} else {
				tr.append('td').text(to_visualize[i][1][j-1])
			}
		}
	}
}

// Default page-on loads
d3.json('d/d5.json',function(error,data){
	showEmotionData(data)
})
$('#select').on('click',function(){
	var date = this.value
	// if (date=='total'){
	// 	date=5;
	// }

   d3.select('#emotionsTable').html('')
d3.json('d/d'+date+'.json',function(error,data){
	showEmotionData(data)

})

})





