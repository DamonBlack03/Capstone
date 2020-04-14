USE [Capstone]
GO

/****** Object:  Table [dbo].[Days]    Script Date: 4/14/2020 4:46:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Days](
	[dayId] [int] IDENTITY(1,1) NOT NULL,
	[capstoneId] [int] NOT NULL,
	[dayNumber] [int] NOT NULL,
	[date] [date] NOT NULL,
	[totalMinutesWorked] [int] NOT NULL,
	[totalMinutesBusy] [int] NOT NULL,
	[totalMinutesSleep] [int] NOT NULL,
	[totalMinutesFun] [int] NOT NULL,
	[successful] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[dayId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Days]  WITH CHECK ADD FOREIGN KEY([capstoneId])
REFERENCES [dbo].[Capstones] ([capstoneId])
GO


