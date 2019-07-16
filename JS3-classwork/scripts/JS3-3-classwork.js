class User {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

let alex = new User('Alex', 'First');
console.log(alex);
console.log(alex.firstName);
console.log(alex.getFullName());







function chanheFirstLetterToUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1);
}

class CV {
    constructor(jobs, educations, email) {
        this.jobs = jobs;
        this.educations = educations;
        this.email = email;
    }

    addJob(job) {
        this.jobs.push(job);
    }

    removeJob(job) {
        this.jobs = this.jobs.filter(x => x !== job);
    }

    addEducation(education) {
        this.educations.push(education);
    }

    removeEducation(education) {
        this.educations = this.educations.filter(x => x !== education);
    }

    renderCV() {
        const renderedCV = document.getElementById('renderedCV');

        for (let key in this) {
            let CV_item = document.createElement('li');

            if (Array.isArray(this[key])) {
                let innerList = document.createElement('ul');
                CV_item.innerHTML += chanheFirstLetterToUpperCase(key);

                this[key].forEach(x => {
                    let innerListItem = document.createElement('li');

                    if (key === 'jobs') {
                        innerListItem.innerHTML = `${chanheFirstLetterToUpperCase(x.title)} - ${x.description} (${x.startDate} - ${x.endDate})`;
                    }
                    else if (key === 'educations') {
                        innerListItem.innerHTML = `${chanheFirstLetterToUpperCase(x.title)} in the ${x.school} in ${x.address} (${x.startDate} - ${x.endDate})`;
                    }

                    innerList.appendChild(innerListItem);
                    CV_item.appendChild(innerList);
                })
            }
            else {
                CV_item.innerHTML = `${chanheFirstLetterToUpperCase(key)}: ${this[key]}`;
            }
            renderedCV.appendChild(CV_item);
        }
    }
}

class Job {
    constructor(id, title, description, startDate, endDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
class Education {
    constructor(id, title, school, address, startDate, endDate) {
        this.id = id;
        this.title = title;
        this.school = school;
        this.address = address;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

const job_manager = new Job(1, 'manager', 'managing content', '2010', '2011');
const job_seller = new Job(2, 'seller', 'selling stuff', '2012', '2013');
const job_nurse = new Job(3, 'nurse', 'caring for people', '2015', '2017');
let myJobs = [job_manager, job_seller];

const education_school = new Education(1, 'pupil', 'school &#x2116 3', 'Ukraine', '1995', '2005');
const education_bachelor = new Education(2, 'student', 'University of Radioelectronics', 'Ukraine', '2005', '2009');
const education_master = new Education(3, 'bachelor', 'University of Radioelectronics', 'Ukraine', '2009', '2010');
let myEducations = [education_school, education_bachelor];

let myCV = new CV(myJobs, myEducations, 'gmail.com');

myCV.addJob(job_nurse);
myCV.addEducation(education_master);

// myCV.removeJob(job_manager);
// myCV.removeEducation(education_school)

myCV.renderCV();