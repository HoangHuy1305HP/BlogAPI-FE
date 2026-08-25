

const BASE_URL = import.meta.env.VITE_API_URL;
export async function createComment(postId:string,content:string,accessToken:string) {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method:"POST",
        headers: {
            "Content-type":"application/json",
            "Authorization":`Bearer ${accessToken}`
        },
        body: JSON.stringify({content})
    })
    const data = await res.json();
    if(!res.ok) throw new Error(data.message || ` Bình luận không thành công`)
    const result = data.newComment;
    return result
}

export async function getComments(postId:string) {
    console.log("GET COMMENT postId =", postId);
    
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    const data = await res.json();
     console.log("COMMENT RESPONSE:", data);
    if(!res.ok) throw new Error(data.message || ` Không thể xem bình luận `);
    const result = data.result;
    return result
}
