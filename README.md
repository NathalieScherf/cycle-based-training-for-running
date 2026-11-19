# A cycle based training plan generator for running 

This is an app that allows female runners to create a training plan for a sepcific goal (between a 5k run and a 160k ultra), based on their current running habits. 
The training is calculates using standard values for training progression (e.g. 3 weeks increades load, 1 recovery week), but it can be individualised. 

The suggested training also syncs with the female cycle, in order to allow the runners to adjust the training load to match recomendations for the different menstrual phases. 

### Why: 

Generating training plans that sync with your cycle is not a feature in any of the existing sports apps that I know ot. The individual variation in the cycle is large and it does not map to the standard training plans by default. 
But I want women to be able to benefit from this cycle bases approach to training, by creating highly adjustable training plans.  

## Current state: 

- There is a calendar the displays the phases of mentrual cycles for the next 6 months. 

- The user can input the goal race date for a marathon. 

## Features to add: 

### Set up
- A set up flow for the user to enter period data and training data (current state, goal distance and date)

### Dashboard:

#### Data display and edits
- A countdown to the goal and inputs to adjust the goal date and distance

- The ability to modify the dates of the currernt cycle (start date of period, length of period, start of ovulation, postponing the next period start date)

#### The training plan
- A training plan generator that 
  - calculates if the goal is possible to reach with a safe increase of training load as per  predefined rules of safe load increase and based on the current training load of the user.
  - Gives reccomendations about other distances or dates if the goal is not possibel. 
  - Generates a training plan if the goal is reachable. The plan is synced to the menstrual cycle of the runner. 
  - A display of the training plan with 
    - weekly load
    - each run
    - the menstrual phases of the week
  - A display of actually done training
    - The total distance of each run that is marked as done in total and for each week (data from the calendar)
  - The ability to make a whole plan as done and store it and generate a new plan. 

#### The calendar
  - A calendar view of the training plan and cycle phases with the possibility to
    - mark a run as done
    - postpone an upcomming run (which triggers a recalculation of the training plan)

## The interesting part: 

The calculation of the training plan needs to be synced with the period data. This is not trivial, as safe training increas follows one set of rules, and how to sync the training with the cycle to have the most physiologigac benefit of each phase, follows an other set of rules. 
The cycle is dynamic and might change each month. The training plan needs to be adapted to this, while still maintaining a load that makes reaching the goal possible. 

The training plan also needs to be able to handle deviations from the plan, e.g. missing training because of travell or illnes. 

A change in any of the data (cycle, training, or goal) should lead to adjustments in the current plan.  

  


## Initial Todos before taking on the feautres of the app: 
- [ ] Add tests to the existing components
- [ ] update packages

## Set up
- Front end only React app
- unit and e2e testing, 100% coverage
- Data storage locally in the local storage of the browser - no personal data leak. 

- Possibly also a desktop app. 
