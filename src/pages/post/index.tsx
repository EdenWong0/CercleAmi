import * as React from 'react';
import Layout from '@/components/layout';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';


interface IPostProps {

}

const Post: React.FunctionComponent<IPostProps> = () => {
    return (
        <Layout>
            <div className='flex justify-center'>
                <div className='border max-w-3xl w-full'>   
                    <h3 className='bg-slate-800 text-white text-center text-lg p-2 rounded-lg'>New Post</h3>
                    <div className='p-8'>
                        <form>
                            <div className='flex flex-col'>
                                <Label className='mb-4' htmlFor='caption'>
                                    Write a caption...
                                </Label>
                                <Textarea className='mb-8' id='caption' placeholder='Share some words to your Ami'/>
                                <div className='flex flex-col'>
                                    <Label className='mb-4' htmlFor='photo'>
                                        Photos
                                    </Label>
                                </div>
                                <Button className='mt-8 w-32' type='submit'>
                                    Post
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Post;