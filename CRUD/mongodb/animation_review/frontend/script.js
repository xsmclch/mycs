const url = new URL(location.href);
const animID = parseInt(url.searchParams.get("animID"));
const title = url.searchParams.get("title");

const container = document.querySelector(".container");
const inputs = document.querySelector("form").querySelectorAll("input");
const h1 = document.querySelector("h1");
h1.textContent = `${title} 评价`;
console.log(inputs)

const APILINK = "http://192.168.10.45:3000/api/v1/reviews/";

function updateReview(id, user, review) {
    const updateCard = document.getElementById(id);
    updateCard.innerHTML = `
<p>创建你的评价</p>
<form id="reviewForm">
    <div><label for="user">用户名</label></div>
    <input type="text" name="user" id="user" placeholder="用户名" value="${user}" data-new required>
    <div><label for="review">评价</label></div>
    <input name="review" name="review" id="review" placeholder="评价" value="${review}" data-new required>
    <div><a href="#" onclick="submitUpdate(false, '${id}')">💾</a></div>
</form>
    `;
}



function getReview() {
    inputs.forEach(input => {
        input.value = ""
    })
    fetch(APILINK + "animation/" + animID)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(review => {
                const div = document.createElement("div");
                div.className = "card";
                div.id = review._id;
                div.dataset.review = "";
                div.innerHTML = `
<p>用户</p>
<p>${review.user}</p>
<p>评论</p>
<p>${review.review}</p>
<div class="buttons">
<a href="#" onclick="updateReview('${review._id}','${review.user}','${review.review.replace(/['"]/, "")}')">✏️</a> 
<a href="#" onclick="deleteReview('${review._id}')">🗑</a>
</div>
                        `;
                container.appendChild(div);
            })
        });
}

function deleteReview(id) {
    fetch(APILINK + id, {
        method: "DELETE"
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            location.reload();
        })
}



function submitUpdate(empty = false, id) {
    if (empty) {
        const user = inputs[0].value;
        const review = inputs[1].value;
        console.log(user, review);
        fetch(APILINK + "animation/new", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ animationID: animID, user, review })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            })
    } else {
        const newInputs = document.querySelectorAll("[data-new]");
        const user = newInputs[0].value;
        const review = newInputs[1].value;
        console.log(user, review);
        fetch(APILINK + id, {
            method: "PUT",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user, review })
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                location.reload();
            })
    }
}

getReview();