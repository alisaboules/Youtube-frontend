'use client'

import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/ui/button/Button";
import { Field } from "@/ui/field/Field";
import { Textarea } from "@/ui/field/Textarea";
import { SkeletonLoader } from "@/ui/SkeletonLoader";
import { UploadField } from "@/ui/field/UploadField";
import { Controller } from "react-hook-form";

export function SettingsForm() {
  const { formObject: { handleSubmit, register, formState: {errors}, control}, isLoading, onSubmit, isProfileLoading} = useSettings();
  return (
    <div className="w-3/5">
    {
      isProfileLoading && <div className="mb-2">Loading...</div>
    }
    {isLoading ? (<SkeletonLoader count={5} className={'h-10 w-3/5'}/>) : 
      (<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10">
        <div>
          <Field label="Email" type="email" registration={register('email', { required: 'Email is required.'})} error={errors.email?.message} placeholder="Enter email..."/>
          <Field label="Password" type="password" registration={register('password', { required: 'Password is required.' })} error={errors.password?.message} placeholder="Enter password..."/>
          <Field label="Channel name" type="text" registration={register('channel.name')} error={errors.channel?.name?.message} placeholder="Enter name..."/>
          <Field label="Slug (alias)" type="text" registration={register('channel.slug')}  error={errors.channel?.slug?.message} placeholder="Enter slug..."/>
          <Textarea label="Description" registration={register('channel.description')} error={errors.channel?.description?.message} placeholder="Enter description..." />
        </div>
        <div className="flex flex-col justify-between h-125">
          <div>
            <Controller control={control} name='channel.avatarUrl' render={({ field: { onChange, value }, fieldState: { error }}) => (
            <UploadField label="Avatar" onChange={onChange} value={value} error={error} folder='avatars' className="rounded-full mb-2"/>
          )} />
            <Controller control={control} name='channel.bannerUrl' render={({ field: { onChange, value }, fieldState: { error }}) => (
            <UploadField label="Banner" onChange={onChange} value={value} error={error} folder='banners' aspectRation="16:9" className="rounded-md" overlay="/overlay.png"/>
          )} />
          </div>
          <div className="text-center mt-4">
          <Button variant="primary" isLoading={isLoading} type="submit">Update</Button>
        </div>
        </div>
        
      </form>
    )}
    </div>
  );
}