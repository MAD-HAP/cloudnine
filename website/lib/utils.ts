const [file1, setFile1] = useState<any>(null);
    const [file2, setFile2] = useState<any>(null);
    const uploadTask = async () => {};
    const doUploadPls1 = (e: any) => {
        const reader1 = new FileReader();

        reader1.readAsDataURL(e.target.files[0]);
        reader1.onload = (readerEvent) => {
            setFile1(readerEvent.target?.result);
        };
    };

    const doUploadPls2 = (e: any) => {
        const reader2 = new FileReader();
        reader2.readAsDataURL(e.target.files[0]);
        reader2.onload = (readerEvent) => {
            setFile2(readerEvent.target?.result);
        };
    };

    const hehe = () => {
        const storageRef1 = ref(storage, `servers/dummy/1`);
        const storageRef2 = ref(storage, `servers/dummy/2`);

        Promise.all([
            uploadString(storageRef1, file1, "data_url"),
            uploadString(storageRef2, file2, "data_url"),
        ]).then(() => {
            alert("uploaded");
        });
    };