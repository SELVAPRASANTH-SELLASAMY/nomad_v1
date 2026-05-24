import rootImage from '../../assets/a-man-writing-a-blog-on-a-computer.webp';
import { memo } from 'react';
function Pictureframe(){
    return(
        <section className='h-100 h-auto_L_768 h-min-600px h-min-450_L_768 h-min-350_L_500 content-centered'>
            <figure style={{maxHeight:'95vh'}} className='relative rounded-05 hide-overflow'>
                <img src={rootImage} className='w-100 middle h-min-600px h-min-450_L_768 h-min-350_L_500' alt="root-image"/>
                <figcaption className='h-100p p-15 absolute bottom-0 left-0 content-bottom overlay'>
                    <h4 className='fs-6 font-weight-600 italic lh-3'>prasanth<span className='text-primary'>.live</span></h4>
                    <p className='fs-4 lh-3 lh-1_L_650 lh-2_L_1120 italic'>Welcome to our brand new content management system. Let’s create and manage all your blog contents here.</p>
                </figcaption>
            </figure>
        </section>
    );
}
export default memo(Pictureframe);