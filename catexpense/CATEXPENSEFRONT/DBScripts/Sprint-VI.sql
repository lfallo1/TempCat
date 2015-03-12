ALTER TABLE dbo.Comments ADD StatusId int NULL;

ALTER TABLE dbo.Comments
ADD CONSTRAINT fk_StatusId
FOREIGN KEY (StatusId)
REFERENCES Status(StatusId);

UPDATE [expense12].[dbo].[Comments]
   SET 
      [StatusId] = 1
 