import { useEffect, useRef, useState } from 'react';
import * as LR from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import { FileEntry } from './../../types/index';
import { OutputFileEntry } from '@uploadcare/blocks';

LR.registerBlocks(LR);

interface IFileUploaderProps {
    fileEntry: FileEntry,
    onChange: (fileEntry: FileEntry) => void;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({fileEntry, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);
    const ctxProviderRef = useRef<InstanceType<LR.UploadCtxProvider>>(null);

    const handleRemoveClick = () => {
        console.log("Is clicked:", fileEntry.files);
    };

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;
    
        const handleChangeEvent = (e: LR.EventMap['change']) => {
          setUploadedFiles([...e.detail.allEntries.filter(f => f.status === 'success')] as OutputFileEntry<'success'>[]);
        };
        ctxProvider.addEventListener('change', handleChangeEvent);
        return () => {
          ctxProvider.removeEventListener('change', handleChangeEvent);
        };
    }, [setUploadedFiles]);

    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();
    
        const handleModalCloseEvent = () => {
          resetUploaderState();
    
          onChange({ files: [...uploadedFiles]});
          setUploadedFiles([]);
        };
    
        ctxProvider.addEventListener('modal-close', handleModalCloseEvent);
    
        return () => {
          ctxProviderRef.current?.removeEventListener('modal-close', handleModalCloseEvent);
        };
    }, [fileEntry, onChange, uploadedFiles, setUploadedFiles]);


    return (
        <div>
          <lr-config
            ctx-name="my-uploader"
            pubkey="0ecaa44e41189c156cf0"
            multiple={true}
            confirmUpload={false}
            removeCopyright={true}
            imgOnly={true}
          />
          <lr-file-uploader-regular
            ctx-name="my-uploader"
            css-src={blocksStyles}
          />
          <lr-upload-ctx-provider
            ctx-name="my-uploader"
            ref={ctxProviderRef}
          />
          <div className='grid grid-cols-2 gap-4 mt-8'>
            {fileEntry.files.map((file) =>(
                <div className='relative' key={file.uuid}>
                    <img src={`${file.cdnUrl}`} key={file.uuid} />
                    <div className='cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7'>
                        <button 
                        className='text-slate-800 text-center' 
                        type='button' 
                        onClick={() => handleRemoveClick(file.uuid)}
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}
          </div>
        </div>
    );
};

export default FileUploader;