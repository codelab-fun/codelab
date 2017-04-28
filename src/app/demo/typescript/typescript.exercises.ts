import {ng2tsConfig, ExerciseConfigTemplate} from '../../../../ng2ts/ng2ts';

/** Temporarily import exercises from ng2ts until it can be migrated/rewritten. */
export const TypescriptExercises: ExerciseConfigTemplate[] =
    ng2tsConfig.milestones[0].exercises as ExerciseConfigTemplate[];
