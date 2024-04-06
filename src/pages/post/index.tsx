import * as React from 'react';
import Layout from '@/components/layout';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '@/components/fileUploader';
import { useUserAuth } from '@/context/userAuthContext';
import { FileEntry, Post } from './../../types/index';


interface IPublishPostProps {}

const PublishPost: React.FunctionComponent<IPublishPostProps> = () => {

    const { user } = useUserAuth();
    const [fileEntry, setFileEntry] = React.useState<FileEntry>({
        files: [],
    });
    const [post, setPost] = React.useState<Post>({
        caption: "",
        photos: [],
        likes: 0,
        userlikes: [],
        userId: null,
        date: new Date(),
    });
    const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Uploaded File Entry:", fileEntry.files)
        console.log("The create post is:", post);
    }
    return (
        <Layout>
            <div className='flex justify-center'>
                <div className='border max-w-3xl w-full'>   
                    <h3 className='bg-slate-800 text-white text-center text-lg p-2 rounded-lg'>New Post</h3>
                    <div className='p-8'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <Label className='mb-4' htmlFor='caption'>
                                     Write a caption...
                                </Label>
                                <Textarea 
                                    className='mb-8' 
                                    id='caption' 
                                    placeholder='Share some words to your Ami' 
                                    value={post.caption} 
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setPost({...post, caption: e.target.value})}
                                />
                                <div className='flex flex-col'>
                                    <Label className='mb-4' htmlFor='photo'>
                                        Photos
                                    </Label>
                                    <FileUploader fileEntry={fileEntry} onChange={setFileEntry}/>
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

export default PublishPost;