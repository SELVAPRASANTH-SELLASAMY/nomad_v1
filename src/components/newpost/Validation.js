const validateContent = (content) => {
    const MIN_TITLE_LEN = 10;
    const MIN_CONTENT_LEN = 1000;
    // Checking the category is empty
    if(!content.category || content.category.trim() === "" || content.category.toLowerCase().trim() === "other" || content.category.toLowerCase().trim() === "--select--"){
        return {state:false,message:"Please select the category"};
    }

    // Checking the length of the title
    const formatedTitle = content.title.replace(/<[^>]*>/g,"").trim();
    if(formatedTitle.length <= MIN_TITLE_LEN){
        return {state:false,message:`Title length must be greater than ${MIN_TITLE_LEN}`};
    }

    // Checking length of the content
    const formatedContent = content.content.replace(/<[^>]*>/g,"").trim();
    if(formatedContent.length <= MIN_CONTENT_LEN){
        return {state:false,message:`Content length must be greater than ${MIN_CONTENT_LEN}`};
    }

    // Checking content include at least one image in it.
    const refImage = content.content.match(/<img[^>]*>/);
    if(!refImage){
        return {state:false,message:`Content must include at least one image for reference`};
    }

    return {state:true};
}

export { validateContent };