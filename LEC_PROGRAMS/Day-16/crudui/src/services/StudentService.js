export async function getAllStudents() {
    try {
        const response = await fetch("http://localhost:7800/students");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function registerStudent(formData) {
    try {
        const response = await fetch("http://localhost:7800/students", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        return response;

    } catch (error) {
        console.log(error);
    }
}