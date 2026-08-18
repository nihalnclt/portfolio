---
title: "How to Create an EC2 Instance"
description: "A quick walkthrough of launching an EC2 instance on AWS."
date: "2024-09-28"
keywords: ["aws", "ec2", "devops"]
---

This is a sample post. The page title comes from the frontmatter, so start the body with regular text or an `##` heading, not a `#` heading.

## Step 1: Open the EC2 console

Sign in to the AWS console and navigate to EC2.

## Step 2: Launch an instance

Pick an AMI, choose an instance type, and configure your security group.

```bash
aws ec2 run-instances --image-id ami-12345678 --instance-type t3.micro
```

Replace this file with your real posts. Each `.md` file in `src/data/posts/` becomes a page at `/posts/<filename>`.
