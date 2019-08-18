Homework
-- Add a task with the these attributes: title, description, created, updated, dueDate, statusID, userID
/*INSERT INTO task (title, description, created, updated, due_date, status_id, user_id) 
	VALUES ('Save the world', 'Be persistent', '2019-08-18', '2019-08-18', NULL, 1, NULL);*/
    
-- Change the title of a task with these attributes: taskID, newTitle
/*UPDATE task
	SET title = 'Become a millioner' 
	WHERE id = 2;*/
    
-- Change the task due date with these attributes: taskID, newDueDate
/*UPDATE task
	SET due_date = '2019-12-05' 
	WHERE id = 3;*/

-- Change the task status with these attributes: taskID, newStatus
/*UPDATE task
	SET status_id = 1 
	WHERE id = 3;*/

-- Mark a task as complete with this attribute: taskID
/*UPDATE task
	SET status_id = 3 
	WHERE id = 1;*/

-- Delete task with this attribute: taskID
/*DELETE FROM task 
	WHERE id = 6;*/

